import type { SupportedCryptoAlgorithms } from "bun";

export interface UcryptType {
	hash: {
		algorithm: SupportedCryptoAlgorithms;
		salt: boolean;
		pepper: boolean;
	};
	jwt: {
		algorithm: "HS256" | "HS512" | "RS256";
		hash: SupportedCryptoAlgorithms;
		expires_after: string;
	};
	rsa: {
		key_size: number;
		gen_params: RsaHashedKeyGenParams;
		key_rotation: number;
	};
	mfa: {
		hash_algorithm: SupportedCryptoAlgorithms;
		// Code length and duration
		digits: number;
		period: number;
	};
	file: {
		// Compression
		format: CompressionFormat;
		chunk_size: number;

		// Encryption
		algorithm: SupportedCryptoAlgorithms;
		salt_length: number;
		iv_length: number;
		modulus_length: number;
	};
}

// Remember u can control click stuff btw to see the types :3
