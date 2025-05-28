import type { SupportedCryptoAlgorithms } from "bun";
import type { ZlibOptions } from "zlib";

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
	file: ZlibOptions;
}

// Remember u can control click stuff btw to see the types :3
