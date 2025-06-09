import type { SupportedCryptoAlgorithms } from "bun";

export interface UcryptType {
	hash: {
		algorithm: SupportedCryptoAlgorithms;
		salt: boolean;
		pepper: boolean;
	};
	exchange: {
		prime_min: number;
		secret_length: number;
	},
	jwt: {
		algorithm: "HS256" | "HS512" | "RS256";
		hash: SupportedCryptoAlgorithms;
		expires_after: string;
	};
	rsa: {
		key_size: number;
		gen_params: RsaHashedKeyGenParams;
		key_rotation: number;
		rotation_cooldown: number;
	};
	aes: {
		hash_algorithm: SupportedCryptoAlgorithms;
		salt_length: number;
		iv_length: number;
		algorithm: string;
		padding: string;
		key_length: number;
		key_rotation: number;
		rotation_cooldown: number;
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
		hash_algorithm: SupportedCryptoAlgorithms;
		salt_length: number;
		iv_length: number;
	};
}

// Remember u can control click stuff btw to see the types :3
