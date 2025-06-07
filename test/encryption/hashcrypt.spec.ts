import { expect, test } from "bun:test";
import { defaults } from "../../src/defaults";
import ucrypt from "../../src";
import rsa_key from "../../src/class/rsa_key";

const uc = new ucrypt(defaults);
const payload = "Hello, World!";

// test("name", () => {
//     expect("name").toBe("name");
// });

test("encryption/hash/digest", async () => {
	const hash = await uc.hash.digest(payload);

	const rsa_key = (await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]))
		.data as rsa_key;
	const encrypted_hash = await rsa_key.encrypt(hash.data as string);
	expect(encrypted_hash.status).toBe(true);
	expect(encrypted_hash.data).toBeTypeOf("string");

	const decrypted_data = await rsa_key.decrypt(encrypted_hash.data as string);
	expect(decrypted_data.status).toBe(true);
	expect(decrypted_data.data).toBe(hash.data);
});
