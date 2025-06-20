import { expect, test } from "bun:test";
import ucrypt from "../../src";
import { AsymmetricKeys } from "../../src/class/asymmetric";

const uc = new ucrypt();
const payload = "Hello, World!";

// test("name", () => {
//     expect("name").toBe("name");
// });

test("encryption/hash/digest", async () => {
	const hash = await uc.hash.digest(payload);

	const keys = (await uc.asymmetric.generateKeyPair(true, ["encrypt", "decrypt"]))
		.data as AsymmetricKeys;
	const encrypted_hash = await keys.encrypt(hash.data as string);
	expect(encrypted_hash.status).toBe(true);
	expect(encrypted_hash.data).toBeTypeOf("string");

	const decrypted_data = await keys.decrypt(encrypted_hash.data as string);
	expect(decrypted_data.status).toBe(true);
	expect(decrypted_data.data).toBe(hash.data);
});
