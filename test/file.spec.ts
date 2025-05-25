import { afterEach, beforeEach, expect, test } from "bun:test";
import { defaults } from "../src/defaults";
import ucrypt from "../src/index";

import fs from "fs";

const uc = new ucrypt(defaults);
const testFilePath = "./test/temp-test-file.txt";

beforeEach(() => {
	fs.writeFileSync(
		testFilePath,
		JSON.stringify({
			username: "admin",
			password: "password123"
		})
	);
});

afterEach(() => {
	if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
});

test("compress", () => {
	const result = uc.file.compress(testFilePath);

	expect(result.status).toBe(true);
	expect(result.data).toBeInstanceOf(Buffer);
});

test("decompress", () => {
	uc.file.compress(testFilePath);
	const result = uc.file.decompress(testFilePath);
	
	expect(result.status).toBe(true);
	expect(result.data).toBeInstanceOf(Buffer);
});
