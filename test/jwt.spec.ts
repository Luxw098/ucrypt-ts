import { expect, test } from "bun:test";
import { defaults } from "../src/defaults";
import ucrypt from "../src";
import { JWTPayloadType } from "../src/types/JWTPayloadType";

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

test("jwt/sign", async () => {
	const jwt = await uc.jwt.sign(payload, secret);

	expect(jwt.status).toBe(true);
	expect(jwt.data).toBeTypeOf("string");
});

test("jwt/verify", async () => {
	const jwt = await uc.jwt.sign(payload, secret);
	const verify = await uc.jwt.verify(jwt.data as string, secret);

	expect(verify.status).toBe(true);
	expect(verify.data).toBe(true);
});
