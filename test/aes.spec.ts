import { expect, test } from "bun:test";
import { AESKeypair } from "../src/class/aes";
import ucrypt from "../src";

const uc = new ucrypt();

// test("name", () => {
//     expect("name").toBe("name");
// });

test("aes/generateKeyPair", () => {
	const aes_key = uc.aes.generateKeyPair();
	expect(aes_key.status).toBe(true);
	expect(aes_key.data).toBeInstanceOf(AESKeypair);
});

test("aes/encrypt", async () => {
	const aes_key = uc.aes.generateKeyPair().data as AESKeypair;

	const encrypted_data = await aes_key.encrypt(
		new TextEncoder().encode("Hello, AES!").buffer as ArrayBuffer
	);
	expect(encrypted_data.status).toBe(true);
	expect(encrypted_data.data).toBeInstanceOf(Uint8Array);
});

test("aes/decrypt", async () => {
	const aes_key = uc.aes.generateKeyPair().data as AESKeypair;

	const buffer = new TextEncoder().encode("Hello, AES!").buffer as ArrayBuffer;
	const encrypted_data = await aes_key.encrypt(buffer);

	const decrypted_data = await aes_key.decrypt(
		encrypted_data.data as Uint8Array<ArrayBuffer>
	);
	expect(decrypted_data.status).toBe(true);
	expect(JSON.stringify(decrypted_data.data)).toBe(JSON.stringify(buffer));
});
test("aes/rotating_keys", async () => {
	const aes_key = uc.aes.generateKeyPair().data as AESKeypair;

	const buffer = new TextEncoder().encode("Hello, AES!").buffer as ArrayBuffer;
	const encrypted_data = await aes_key.encrypt(buffer);

	const original_key = aes_key.keys.c;
	aes_key.rotate();

	expect(aes_key.keys.c).not.toBe(original_key);
	expect(aes_key.keys.p).toBe(original_key);

	expect(aes_key.keys.c).not.toBe(original_key);
	expect(aes_key.keys.p).toBe(original_key);

	const decrypted_data = await aes_key.decrypt(
		encrypted_data.data as Uint8Array<ArrayBuffer>
	);
	expect(decrypted_data.status).toBe(true);
	expect(JSON.stringify(decrypted_data.data)).toBe(JSON.stringify(buffer));
});
