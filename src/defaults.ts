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
		keySize: 2048,
		publicAlgorithm: "pkcs1",
		privateAlgorithm: "pkcs8"
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
