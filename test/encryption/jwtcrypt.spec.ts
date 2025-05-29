import { expect, test } from "bun:test";
import { defaults } from "../../src/defaults";
import ucrypt from "../../src";
import { JWTPayloadType } from "../../src/types/JWTPayloadType";

const uc = new ucrypt(defaults);

const time = Math.floor(Date.now() / 1000);
const secret = crypto.randomUUID();
const payload: JWTPayloadType = {
	issuer: "ucrypt",
	subject: "test",
	issuedAt: time,
	expiration: time + 60 * 60, // 1 hour
	notBefore: time,
	user: "admin",
	pass: "admin"
};

// test("name", () => {
//     expect("name").toBe("name");
// });

test("encryption/jwt/sign&verify", async () => {
	const jwt = await uc.jwt.sign(payload, secret);
	const key_pair = await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]);
	const encrypted_jwt = await uc.rsa.encrypt(
		jwt.data,
		(key_pair.data as CryptoKeyPair).publicKey
	);
	expect(encrypted_jwt.status).toBe(true);
	expect(encrypted_jwt.data).toBeTypeOf("string");

	const decrypted_jwt = await uc.rsa.decrypt(
		encrypted_jwt.data as string,
		(key_pair.data as CryptoKeyPair).privateKey
	);
	expect(decrypted_jwt.status).toBe(true);
	expect(decrypted_jwt.data).toBeTypeOf("string");

	const verify = await uc.jwt.verify(decrypted_jwt.data as string, secret);
	expect(verify.status).toBe(true);
	expect(verify.data).toBe(true);
});
