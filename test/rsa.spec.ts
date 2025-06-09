import { expect, test } from "bun:test";
import { RSAKeypair } from "../src/class/rsa";
import ucrypt from "../src";

const uc = new ucrypt();

// test("name", () => {
//     expect("name").toBe("name");
// });

test("rsa/generateKeyPair", async () => {
	const key_pair = await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]);
	expect(key_pair.status).toBe(true);
	expect(key_pair.data).toBeInstanceOf(RSAKeypair);
});

test("rsa/encrypt", async () => {
	const rsa_key = (await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]))
		.data as RSAKeypair;

	const encrypted_data = await rsa_key.encrypt("Hello, RSA!");
	expect(encrypted_data.status).toBe(true);
	expect(typeof encrypted_data.data).toBe("string");
});

test("rsa/decrypt", async () => {
	const rsa_key = (await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]))
		.data as RSAKeypair;

	const encrypted_data = await rsa_key.encrypt("Hello, RSA!");

	const decrypted_data = await rsa_key.decrypt(encrypted_data.data as string);
	expect(decrypted_data.status).toBe(true);
	expect(decrypted_data.data).toBe("Hello, RSA!");
});
test("rsa/rotating_keys", async () => {
	const rsa_key = (await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]))
		.data as RSAKeypair;

	const encrypted_data = await rsa_key.encrypt("Hello, RSA!");

	const original_public = rsa_key.keys.c.publicKey;
	const original_private = rsa_key.keys.c.privateKey;

	await rsa_key.rotate();

	expect(rsa_key.keys.c.publicKey).not.toBe(original_public);
	expect(rsa_key.keys.p!.publicKey).toBe(original_public);

	expect(rsa_key.keys.c.privateKey).not.toBe(original_private);
	expect(rsa_key.keys.p!.privateKey).toBe(original_private);

	const decrypted_data = await rsa_key.decrypt(encrypted_data.data as string);
	expect(decrypted_data.status).toBe(true);
	expect(decrypted_data.data).toBe("Hello, RSA!");
});
