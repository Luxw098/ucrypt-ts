import { expect, test } from "bun:test";
import { defaults } from "../../src/defaults";
import ucrypt from "../../src";

const uc = new ucrypt(defaults);
const payload = "Hello, World!";

// test("name", () => {
//     expect("name").toBe("name");
// });

test("encryption/hash/digest", async () => {
	const hash = await uc.hash.digest(payload);
	const key_pair = await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]);
	const encrypted_hash = await uc.rsa.encrypt(
		hash.data,
		(key_pair.data as CryptoKeyPair).publicKey
	);
	expect(encrypted_hash.status).toBe(true);
	expect(encrypted_hash.data).toBeTypeOf("string");

	const decrypted_data = await uc.rsa.decrypt(
		encrypted_hash.data as string,
		(key_pair.data as CryptoKeyPair).privateKey
	);
	expect(decrypted_data.status).toBe(true);
	expect(decrypted_data.data).toBe(hash.data);
});
