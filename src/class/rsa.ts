import crypto from "crypto";

export default class rsa {
	public generateKeyPair(keySize: number) {
		const key_pair = crypto.generateKeyPairSync("rsa", {
			modulusLength: keySize,
			publicKeyEncoding: {
				type: "spki",
				format: "pem"
			},
			privateKeyEncoding: {
				type: "pkcs8",
				format: "pem"
			}
		});

		return {
			publickey: key_pair.publicKey,
			privatekey: key_pair.privateKey
		};
	}

	public encrypt(data: string, publicKey: string) {
		return crypto.publicEncrypt(publicKey, Buffer.from(data));
	}

	public decrypt(data: string, privateKey: string) {
		return crypto.privateDecrypt(privateKey, Buffer.from(data));
	}
}
