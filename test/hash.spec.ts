import { expect, test } from "bun:test";
import { defaults } from "../src/defaults";
import ucrypt from "../src/index";

const uc = new ucrypt(defaults);

// test("name", () => {
//     expect("name").toBe("name");
// });

test("hash/digest", async () => {
	const result = await uc.hash.digest("Hello, World!");

	expect(result.status).toBe(true);
	expect(result.data).toBeTypeOf("string");
});
