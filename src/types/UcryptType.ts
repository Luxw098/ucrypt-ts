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
		publicAlgorithm: "pkcs1" | "spki";
		privateAlgorithm: "pkcs1" | "pkcs8";
		padding: "pkcs1" | "oaep";
	};
}
