import type { UcryptType } from "./types/UcryptType";

export const defaults: UcryptType = {
	hash: {
		algorithm: "sha256",
		salt: true,
		pepper: false
	},
	jwt: {
		algorithm: "HS256",
		hash: "sha256",
		expires_after: "1h"
	},
	rsa: {
		gen_params: {
			name: "RSA-OAEP",
			hash: { name: "SHA-256" },
			modulusLength: 2048,
			publicExponent: new Uint8Array([1, 0, 1])
		},
		key_size: 2048
	},
	mfa: {
		hash_algorithm: "sha1",
		digits: 6,
		period: 30
	},
	file: {
		format: "gzip",
		chunk_size: 1024 * 1024,

		algorithm: "sha256",
		salt_length: 16,
		modulus_length: 2048,
		iv_length: 12
	}
};
