import { expect, test } from "bun:test";
import { defaults } from "../src/defaults";
import ucrypt from "../src";

const uc = new ucrypt(defaults);

// test("name", () => {
//     expect("name").toBe("name");
// });

test("mfa/generateSecret", () => {
	const secret = uc.mfa.generateSecret(20);

	expect(secret.status).toBe(true);
	expect(secret.data).toBeTypeOf("string");
});

test("mfa/generateTOTP", async () => {
	const secret = uc.mfa.generateSecret(20);
	const code = await uc.mfa.generateTOTP(secret.data as string);

	expect(code.status).toBe(true);
	expect(code.data).toBeTypeOf("string");
	expect(code.data).toHaveLength(defaults.mfa.digits);
});

test("mfa/verifyTOTP", async () => {
	const secret = uc.mfa.generateSecret(20);
	const code = await uc.mfa.generateTOTP(secret.data as string);
	const verify = await uc.mfa.verifyTOTP(code.data as string, secret.data as string);

	expect(verify.status).toBe(true);
	expect(verify.data).toBe(true);
	expect((await uc.mfa.verifyTOTP("123456", secret.data as string)).data).toBe(false);
});
