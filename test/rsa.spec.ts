import { expect, test } from "bun:test";
import { defaults } from "../src/defaults";
import ucrypt from "../src";

const uc = new ucrypt(defaults);

// test("name", () => {
//     expect("name").toBe("name");
// });

test("rsa/generateKeyPair", async () => {
	const key_pair = await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]);
	expect(key_pair.status).toBe(true);
	expect(key_pair.data).toHaveProperty("privateKey");
	expect(key_pair.data).toHaveProperty("publicKey");
});

test("rsa/encrypt", async () => {
	const key_pair = await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]);

	const encrypted_data = await uc.rsa.encrypt(
		"Hello, RSA!",
		(key_pair.data as CryptoKeyPair).publicKey
	);
	expect(encrypted_data.status).toBe(true);
	expect(typeof encrypted_data.data).toBe("string");
});

test("rsa/decrypt", async () => {
	const keyPair = await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]);

	const encrypted_data = await uc.rsa.encrypt(
		"Hello, RSA!",
		(keyPair.data as CryptoKeyPair).publicKey
	);

	const decrypted_data = await uc.rsa.decrypt(
		encrypted_data.data as string,
		(keyPair.data as CryptoKeyPair).privateKey
	);
	expect(decrypted_data.status).toBe(true);
	expect(decrypted_data.data).toBe("Hello, RSA!");
});
