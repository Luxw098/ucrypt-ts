import { expect, test } from "bun:test";
import { JWTPayloadType } from "../../src/types/JWTPayloadType";
import rsa_key from "../../src/class/rsa_key";
import ucrypt from "../../src";

const uc = new ucrypt();

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

	const rsa_key = (await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]))
		.data as rsa_key;
	const encrypted_jwt = await rsa_key.encrypt(jwt.data as string);
	expect(encrypted_jwt.status).toBe(true);
	expect(encrypted_jwt.data).toBeTypeOf("string");

	const decrypted_jwt = await rsa_key.decrypt(encrypted_jwt.data as string);
	expect(decrypted_jwt.status).toBe(true);
	expect(decrypted_jwt.data).toBeTypeOf("string");

	const verify = await uc.jwt.verify(decrypted_jwt.data as string, secret);
	expect(verify.status).toBe(true);
	expect(verify.data).toBe(true);
});
