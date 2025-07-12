import { afterEach, beforeEach, expect, test } from "bun:test";
import ucrypt from "../src/index";

import fs from "fs";

const uc = new ucrypt();
const test_file_path = "./test/temp-test-file.txt";
const test_file_data = {
	username: "admin",
	password: "password123"
};

beforeEach(() => {
	fs.writeFileSync(test_file_path, JSON.stringify(test_file_data));
});

afterEach(() => {
	if (fs.existsSync(test_file_path)) fs.unlinkSync(test_file_path);
});

// test("name", () => {
//     expect("name").toBe("name");
// });

test("file/encrypt", async () => {
	const file = fs.readFileSync(test_file_path).buffer;
	const result = await uc.file.encrypt(file, "test-password");
	console.log(result);
	expect(result.status).toBe(true);
	expect(result.data).toBeInstanceOf(Uint8Array);
});

test("file/decrypt", async () => {
	const file = fs.readFileSync(test_file_path).buffer;
	const encrypted_file = await uc.file.encrypt(file, "test-password");
	const result = await uc.file.decrypt(
		encrypted_file.data as Uint8Array<ArrayBuffer>,
		"test-password"
	);
	expect(result.status).toBe(true);
	expect(result.data).toEqual(file);
});

test("file/compress", async () => {
	const file = fs.readFileSync(test_file_path);
	const result = await uc.file.compress(file);

	expect(result.status).toBe(true);
	expect(result.data).toBeInstanceOf(Uint8Array);
});

test("file/decompress", async () => {
	const file = fs.readFileSync(test_file_path);
	const compressed = await uc.file.compress(file);
	const result = await uc.file.decompress(compressed.data as Uint8Array<ArrayBuffer>);

	expect(result.status).toBe(true);
	expect(result.data).toBeInstanceOf(Uint8Array);
});
