import { ReturnFalse, ReturnTrue, type ReturnType } from "../types/ReturnType";
import type { UcryptType } from "../types/UcryptType";
import crypto from "crypto";
import { b32 } from "../util/b32";
export default class mfa {
	private options: UcryptType["mfa"];
	public constructor(options: UcryptType["mfa"]) {
		this.options = options;
	}

	public generateSecret(length = 20): ReturnType<string> {
		try {
			const buffer = crypto.randomBytes(length);
			const secret = b32.btoa32(buffer);
			return ReturnTrue(secret);
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	public generate(secret: string, previous = 0): ReturnType<string> {
		try {
			const currentCounter = Math.floor(Date.now() / 1000 / this.options.period);
			let adjustedCounter = currentCounter - previous;

			const counterBuffer = Buffer.alloc(8);
			for (let i = 7; i >= 0; i--) {
				counterBuffer[i] = adjustedCounter & 0xff;
				adjustedCounter >>= 8;
			}

			const secretBuffer = b32.a32tob(secret);

			const hmac = crypto
				.createHmac(this.options.algorithm, secretBuffer)
				.update(counterBuffer)
				.digest();
			const offset = hmac[hmac.length - 1]! & 0xf;
			const binary =
				((hmac[offset]! & 0x7f) << 24) |
				((hmac[offset + 1]! & 0xff) << 16) |
				((hmac[offset + 2]! & 0xff) << 8) |
				(hmac[offset + 3]! & 0xff); //Ai wrote these bit operations i dont know bit manipulation

			const token = binary % Math.pow(10, this.options.digits);
			const code = token.toString().padStart(this.options.digits, "0");

			return ReturnTrue(code);
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	public verify(code: string, secret: string): ReturnType<boolean> {
		try {
			if (code.length !== this.options.digits || !/^\d+$/.test(code))
				return ReturnFalse(new Error("Invalid code format"));

			const currentCode = this.generate(secret, 0);
			if (currentCode.status && currentCode.data === code) return ReturnTrue(true);

			const previousCode = this.generate(secret, 1);
			if (previousCode.status && previousCode.data === code) return ReturnTrue(true);

			return ReturnTrue(false);
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}
}
