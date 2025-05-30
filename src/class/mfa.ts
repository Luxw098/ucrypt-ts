import { ReturnFalse, ReturnTrue, type ReturnType } from "../types/ReturnType";
import type { UcryptType } from "../types/UcryptType";
import { b32 } from "../util/b32";
import { cryptoTranslator as crypto } from "../translations/CryptoTranslator";
export default class mfa {
	private options: UcryptType["mfa"];
	public constructor(options: UcryptType["mfa"]) {
		this.options = options;
	}

	public generateSecret(length: number): ReturnType<string> {
		try {
			const random_bytes = new Uint32Array(length);
			// @ts-expect-error this is correct?
			crypto.getRandomValues(random_bytes);
			return ReturnTrue(b32.btoa32(Buffer.from(random_bytes.buffer)));
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	public async generateTOTP(secret: string, interval = 0): Promise<ReturnType<string>> {
		try {
			const counter = Math.floor(Date.now() / 1000 / this.options.period) - interval;
			const counter_buffer = new ArrayBuffer(8);
			const view = new DataView(counter_buffer);
			view.setBigUint64(0, BigInt(counter), false);

			const key = await crypto.subtle.importKey(
				"raw",
				b32.a32tob(secret),
				{
					name: "HMAC",
					hash: { name: this.options.hash_algorithm }
				},
				false,
				["sign"]
			);

			const signature = await crypto.subtle.sign({ name: "HMAC" }, key, counter_buffer);
			const hash = new Uint8Array(signature);
			const offset = hash[hash.length - 1] & 0xf;
			const code =
				((hash[offset] & 0x7f) << 24) |
				((hash[offset + 1] & 0xff) << 16) |
				((hash[offset + 2] & 0xff) << 8) |
				(hash[offset + 3] & 0xff);

			const otp = code % Math.pow(10, this.options.digits);

			return ReturnTrue(otp.toString().padStart(this.options.digits, "0"));
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	public async verifyTOTP(code: string, secret: string): Promise<ReturnType<boolean>> {
		try {
			const generated_code = await this.generateTOTP(secret);
			const previous_code = await this.generateTOTP(secret, 1);
			if (!generated_code.status || !previous_code.status)
				return ReturnFalse(new Error("Failed to generate TOTP codes"));

			if (generated_code.data === code || previous_code.data === code)
				return ReturnTrue(true);

			return ReturnTrue(generated_code.data === code);
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}
}
