import { expect, test } from "bun:test";
import { defaults } from "../src/defaults";
import ucrypt from "../src";
import rsa_key from "../src/class/rsa_key";

const uc = new ucrypt(defaults);

// test("name", () => {
//     expect("name").toBe("name");
// });

test("rsa/generateKeyPair", async () => {
	const key_pair = await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]);
	expect(key_pair.status).toBe(true);
	expect(key_pair.data).toBeInstanceOf(rsa_key);
});

test("rsa/encrypt", async () => {
	const rsa_key = (await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]))
		.data as rsa_key;

	const encrypted_data = await rsa_key.encrypt("Hello, RSA!");
	expect(encrypted_data.status).toBe(true);
	expect(typeof encrypted_data.data).toBe("string");
});

test("rsa/decrypt", async () => {
	const rsa_key = (await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]))
		.data as rsa_key;

	const encrypted_data = await rsa_key.encrypt("Hello, RSA!");

	const decrypted_data = await rsa_key.decrypt(encrypted_data.data as string);
	expect(decrypted_data.status).toBe(true);
	expect(decrypted_data.data).toBe("Hello, RSA!");
});
test("rsa/rotating_keys", async () => {
	const rsa_key = (await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]))
		.data as rsa_key;

	const encrypted_data = await rsa_key.encrypt("Hello, RSA!");

	const originalPublicKey = rsa_key.keys.c.publicKey;
	await rsa_key.rotate();

	expect(rsa_key.keys.c.publicKey).not.toBe(originalPublicKey);
	expect(rsa_key.keys.p!.publicKey).toBe(originalPublicKey);

	const decrypted_data = await rsa_key.decrypt(encrypted_data.data as string);
	expect(decrypted_data.status).toBe(true);
	expect(decrypted_data.data).toBe("Hello, RSA!");
});
