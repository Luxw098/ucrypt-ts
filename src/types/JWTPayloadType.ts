export interface JWTPayloadType {
	issuer?: string;
	subject?: string;
	audience?: string | string[];
	expiration?: number;
	issuedAt?: number;
	notBefore?: number;
	jwtId?: string;
	[key: string]: unknown;
}
