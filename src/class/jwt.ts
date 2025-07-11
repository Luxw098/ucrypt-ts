import { type JWTPayloadType } from "../types/JWTPayloadType";
import { Return, type ReturnType } from "../types/ReturnType";
import type { UcryptType } from "../types/UcryptType";
import { b64 } from "../util/b64";

export default class jwt {
	private options: UcryptType["jwt"];
	public constructor(options: UcryptType["jwt"]) {
		this.options = options;
	}

	public async sign(data: JWTPayloadType, secret: string): Promise<ReturnType<string>> {
		try {
			const encoded_header = b64.encodeURL(
				JSON.stringify({
					alg: this.options.algorithm,
					typ: "JWT"
				})
			);
			const encoded_payload = b64.encodeURL(JSON.stringify(data));

			const data_to_sign = `${encoded_header}.${encoded_payload}`;

			const encoder = new TextEncoder();
			const key_data = encoder.encode(secret);
			const key = await crypto.subtle.importKey(
				"raw",
				key_data,
				{ name: "HMAC", hash: { name: this.options.hash } },
				false,
				["sign", "verify"]
			);

			const signature = await crypto.subtle.sign(
				"HMAC",
				key,
				encoder.encode(data_to_sign)
			);

			const encoded_signature = b64.fromArrayBuffer(signature); // BROKEN

			return Return(true, data_to_sign + "." + encoded_signature);
		} catch (err) {
			return Return(false, err as Error);
		}
	}

	public async verify(token: string, secret: string): Promise<ReturnType<boolean>> {
		try {
			const parts = token.split(".");
			if (parts.length !== 3) return Return(false, new Error("Invalid JWT format"));

			const [encoded_header, encoded_payload, encoded_signature] = parts;
			if (!encoded_header || !encoded_payload || !encoded_signature)
				return Return(false, new Error("Invalid JWT format"));

			const data_to_verify = encoded_header + "." + encoded_payload;

			const encoder = new TextEncoder();
			const key_data = encoder.encode(secret);
			const key = await crypto.subtle.importKey(
				"raw",
				key_data,
				{ name: "HMAC", hash: { name: "SHA-256" } },
				false,
				["verify"]
			);

			const signature = b64.toArrayBuffer(encoded_signature);

			const verify = await crypto.subtle.verify(
				"HMAC",
				key,
				signature,
				encoder.encode(data_to_verify)
			);

			return Return(true, verify);
		} catch (err) {
			return Return(false, err as Error);
		}
	}
}
