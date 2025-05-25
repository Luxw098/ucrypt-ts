export const defaults = {
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
		publicAlgorithm: "spki",
		privateAlgorithm: "pkcs8",
		padding: "oaep"
	},
	mfa: {
		algorithm: "sha1",
		digits: 6,
		period: 30
	},
	file: {
		algorithm: "aes-256-cbc",
		keySize: 32,
		ivSize: 16
	}
};
