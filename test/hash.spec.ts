import { expect, test } from "bun:test";
import ucrypt from "../src/index";

const uc = new ucrypt();

// test("name", () => {
//     expect("name").toBe("name");
// });

test("hash/digest", async () => {
	const result = await uc.hash.digest("Hello, World!");

	expect(result.status).toBe(true);
	expect(result.data).toBeTypeOf("string");
});
