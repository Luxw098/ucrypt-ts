import { expect, test } from "bun:test";
import { defaults } from "../../src/defaults";
import ucrypt from "../../src";

const uc = new ucrypt(defaults);

// test("name", () => {
//     expect("name").toBe("name");
// });

test("encryption/mfa/generate&verifyTOTP", async () => {
	const secret = uc.mfa.generateSecret(20);
	expect(secret.status).toBeTrue();
	expect(secret.data).toBeTypeOf("string");

	const totp = await uc.mfa.generateTOTP(secret.data as string);
	expect(totp.status).toBeTrue();
	expect(totp.data).toBeTypeOf("string");

	const verify_totp = await uc.mfa.verifyTOTP(totp.data as string, secret.data as string);
	expect(verify_totp.status).toBeTrue();
	expect(verify_totp.data).toBeTrue();
});
