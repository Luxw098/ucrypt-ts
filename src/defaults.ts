import type { UcryptType } from "./types/UcryptType";

export const defaults: UcryptType = {
	hash: {
		algorithm: "sha256",
		salt: true,
		pepper: false
	},
	exchange: {
		prime_min: 594 * 237 * 567 * 234,
		secret_length: 256
	},
	jwt: {
		algorithm: "HS256",
		hash: "sha256",
		expires_after: "1h"
	},
	asymmetric: {
		gen_params: {
			name: "RSA-OAEP",
			hash: { name: "SHA-256" },
			modulusLength: 2048,
			publicExponent: new Uint8Array([1, 0, 1])
		},
		key_size: 2048,
		key_rotation: 60,
		rotation_cooldown: 3
	},
	symmetric: {
		hash_algorithm: "sha256",
		salt_length: 16,
		iv_length: 12,
		algorithm: "AES-GCM",
		padding: "PBKDF2",
		key_length: 256,
		key_rotation: 60,
		rotation_cooldown: 3
	},
	mfa: {
		hash_algorithm: "sha1",
		digits: 6,
		period: 30
	},
	file: {
		format: "gzip",
		chunk_size: 1024 * 1024,

		hash_algorithm: "sha256",
		salt_length: 16,
		iv_length: 12
	}
};
