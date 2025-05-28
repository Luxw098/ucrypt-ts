import { afterEach, beforeEach, expect, test } from "bun:test";
import { defaults } from "../src/defaults";
import ucrypt from "../src/index";

import fs from "fs";

const uc = new ucrypt(defaults);
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

test("file/encrypt", () => {
	const result = uc.file.encrypt(test_file_path, "test-password");

	expect(result.status).toBe(true);
	expect(result.data).toBeInstanceOf(Buffer);
});

test("file/decrypt", () => {
	uc.file.encrypt(test_file_path, "test-password");
	const result = uc.file.decrypt(test_file_path, "test-password");
	expect(result.status).toBe(true);
	expect(result.data).toBeInstanceOf(Buffer);
	expect(JSON.parse(result.data.toString())).toEqual(test_file_data);
});

test("file/compress", () => {
	const result = uc.file.compress(test_file_path);

	expect(result.status).toBe(true);
	expect(result.data).toBeInstanceOf(Buffer);
});

test("file/decompress", () => {
	uc.file.compress(test_file_path);
	const result = uc.file.decompress(test_file_path);

	expect(result.status).toBe(true);
	expect(result.data).toBeInstanceOf(Buffer);
});
