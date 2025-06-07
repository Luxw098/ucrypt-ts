import { expect, test } from "bun:test";
import ucrypt from "../src/index";

test("example", async () => {
	const crypto = new ucrypt();

	//Hashing implementation
	const known_hash = "1d08c598430d2d8d98fa3d3f49e8dca331daa818958d8bf0dbfa2aa384d8a7fd";
	const hash = (await crypto.hash.digest("sensitive data")).data as string;
	expect(hash).toBe(known_hash);

	// JWT Token Generation and Verification
	const jwt_secret = crypto.generateSecret(16).data as string;
	const jwt_token = (await crypto.jwt.sign({ userId: 123 }, jwt_secret)).data as string;
	const jwt_valid = await crypto.jwt.verify(jwt_token, jwt_secret);
	expect(jwt_valid.data).toBe(true);

	// 2FA Code Generation and Verification
	const mfa_secret = crypto.generateSecret(16).data as string;
	const mfa_code = (await crypto.mfa.generateTOTP(mfa_secret)).data as string;
	const mfa_valid = await crypto.mfa.verifyTOTP(mfa_code, mfa_secret);
	expect(mfa_valid.data).toBe(true);
});
