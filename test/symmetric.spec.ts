import { expect, test } from "bun:test";
import { SymmetricKey } from "../src/class/symmetric";
import ucrypt from "../src";

const uc = new ucrypt();

// test("name", () => {
//     expect("name").toBe("name");
// });

test("symmetric/generateKeyPair", () => {
	const key = uc.symmetric.generateKeyPair();
	expect(key.status).toBe(true);
	expect(key.data).toBeInstanceOf(SymmetricKey);
});

test("symmetric/encrypt", async () => {
	const key = uc.symmetric.generateKeyPair().data as SymmetricKey;

	const encrypted_data = await key.encrypt(
		new TextEncoder().encode("Hello, Symmetric!").buffer as ArrayBuffer
	);
	expect(encrypted_data.status).toBe(true);
	expect(encrypted_data.data).toBeInstanceOf(Uint8Array);
});

test("aes/decrypt", async () => {
	const key = uc.symmetric.generateKeyPair().data as SymmetricKey;

	const buffer = new TextEncoder().encode("Hello, Symmetric!").buffer as ArrayBuffer;
	const encrypted_data = await key.encrypt(buffer);

	const decrypted_data = await key.decrypt(
		encrypted_data.data as Uint8Array<ArrayBuffer>
	);
	expect(decrypted_data.status).toBe(true);
	expect(JSON.stringify(decrypted_data.data)).toBe(JSON.stringify(buffer));
});
test("aes/rotating_keys", async () => {
	const key = uc.symmetric.generateKeyPair().data as SymmetricKey;

	const buffer = new TextEncoder().encode("Hello, AES!").buffer as ArrayBuffer;
	const encrypted_data = await key.encrypt(buffer);

	const original_key = key.keys.c;
	key.rotate();

	expect(key.keys.c).not.toBe(original_key);
	expect(key.keys.p).toBe(original_key);

	expect(key.keys.c).not.toBe(original_key);
	expect(key.keys.p).toBe(original_key);

	const decrypted_data = await key.decrypt(
		encrypted_data.data as Uint8Array<ArrayBuffer>
	);
	expect(decrypted_data.status).toBe(true);
	expect(JSON.stringify(decrypted_data.data)).toBe(JSON.stringify(buffer));
});
