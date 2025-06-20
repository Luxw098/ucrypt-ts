import { expect, test } from "bun:test";
import { AsymmetricKeys } from "../src/class/asymmetric";
import ucrypt from "../src";

const uc = new ucrypt();

// test("name", () => {
//     expect("name").toBe("name");
// });

test("asymmetric/generateKeyPair", async () => {
	const key_pair = await uc.asymmetric.generateKeyPair(true, ["encrypt", "decrypt"]);
	expect(key_pair.status).toBe(true);
	expect(key_pair.data).toBeInstanceOf(AsymmetricKeys);
});

test("asymmetric/encrypt", async () => {
	const keys = (await uc.asymmetric.generateKeyPair(true, ["encrypt", "decrypt"]))
		.data as AsymmetricKeys;

	const encrypted_data = await keys.encrypt("Hello, Asymmetric!");
	expect(encrypted_data.status).toBe(true);
	expect(typeof encrypted_data.data).toBe("string");
});

test("asymmetric/decrypt", async () => {
	const keys = (await uc.asymmetric.generateKeyPair(true, ["encrypt", "decrypt"]))
		.data as AsymmetricKeys;

	const encrypted_data = await keys.encrypt("Hello, Asymmetric!");

	const decrypted_data = await keys.decrypt(encrypted_data.data as string);
	expect(decrypted_data.status).toBe(true);
	expect(decrypted_data.data).toBe("Hello, Asymmetric!");
});
test("asymmetric/rotating_keys", async () => {
	const keys = (await uc.asymmetric.generateKeyPair(true, ["encrypt", "decrypt"]))
		.data as AsymmetricKeys;

	const encrypted_data = await keys.encrypt("Hello, Asymmetric!");

	const original_public = keys.keys.c.publicKey;
	const original_private = keys.keys.c.privateKey;

	await keys.rotate();

	expect(keys.keys.c.publicKey).not.toBe(original_public);
	expect(keys.keys.p!.publicKey).toBe(original_public);

	expect(keys.keys.c.privateKey).not.toBe(original_private);
	expect(keys.keys.p!.privateKey).toBe(original_private);

	const decrypted_data = await keys.decrypt(encrypted_data.data as string);
	expect(decrypted_data.status).toBe(true);
	expect(decrypted_data.data).toBe("Hello, Asymmetric!");
});
