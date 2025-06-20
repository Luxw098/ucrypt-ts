import { expect, test } from "bun:test";
import { JWTPayloadType } from "../../src/types/JWTPayloadType";
import { AsymmetricKeys } from "../../src/class/asymmetric";
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

	const keys = (await uc.asymmetric.generateKeyPair(true, ["encrypt", "decrypt"]))
		.data as AsymmetricKeys;
	const encrypted_jwt = await keys.encrypt(jwt.data as string);
	expect(encrypted_jwt.status).toBe(true);
	expect(encrypted_jwt.data).toBeTypeOf("string");

	const decrypted_jwt = await keys.decrypt(encrypted_jwt.data as string);
	expect(decrypted_jwt.status).toBe(true);
	expect(decrypted_jwt.data).toBeTypeOf("string");

	const verify = await uc.jwt.verify(decrypted_jwt.data as string, secret);
	expect(verify.status).toBe(true);
	expect(verify.data).toBe(true);
});
