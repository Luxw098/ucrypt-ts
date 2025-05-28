import type { SupportedCryptoAlgorithms } from "bun";

export interface UcryptType {
	hash: {
		algorithm: SupportedCryptoAlgorithms;
		salt: boolean;
		pepper: boolean;
	};
	jwt: {
		algorithm: "HS256" | "HS512" | "RS256";
		expiresAfter: string;
	};
	rsa: {
		keySize: number;
		genParams: RsaHashedKeyGenParams;
	};
	mfa: {
		algorithm: SupportedCryptoAlgorithms;
		digits: number;
		period: number;
	};
	file: {
		format: CompressionFormat;
		chunkSize: number;

		algorithm: SupportedCryptoAlgorithms;
		ivLength: number;
		tagLength: number;
	};
}

// Remember u can control click stuff btw to see the types :3
