import type { CipherCCMTypes, CipherGCMTypes, CipherOCBTypes, RSAKeyPairOptions } from "crypto";

export interface UcryptType {
	hash: {
		algorithm: "sha256" | "sha512" | "md5";
		salt: boolean;
		pepper: boolean;
	};
	jwt: {
		algorithm: "HS256" | "HS512" | "RS256";
		expiresAfter: string;
	};
	rsa: {
		keySize: number;
		publicAlgorithm: RSAKeyPairOptions<"pem", "pem">["publicKeyEncoding"]["type"];
		privateAlgorithm: RSAKeyPairOptions<"pem", "pem">["privateKeyEncoding"]["type"];
	};
	mfa: {
		algorithm: "sha1" | "sha256";
		digits: number;
		period: number;
	};
	file: {
		algorithm: CipherCCMTypes | CipherGCMTypes | CipherOCBTypes;
		keySize: number;
		ivSize: number;
	};
}
