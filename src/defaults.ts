import type { UcryptType } from "./types/UcryptType";

export const defaults: UcryptType = {
	hash: {
		algorithm: "sha256",
		salt: true,
		pepper: false
	},
	jwt: {
		algorithm: "HS256",
		expiresAfter: "1h"
	},
	rsa: {
		genParams: {
			name: "RSA-OAEP",
			hash: { name: "SHA-256" },
			modulusLength: 2048,
			publicExponent: new Uint8Array([1, 0, 1])
		},
		keySize: 2048
	},
	mfa: {
		algorithm: "sha1",
		digits: 6,
		period: 30
	},
	file: {
		strategy: 0,
		memLevel: 6,
		level: 6,
		windowBits: 15
	}
};
