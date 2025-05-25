import { expect, test } from "bun:test";
import { defaults } from "../src/defaults";
import ucrypt from "../src/index";

const uc = new ucrypt(defaults);

// test("name", () => {
//     expect("name").toBe("name");
// });

test("hash/digest", () => {
	const result = uc.hash.digest("Hello, World!", "hex");

	expect(result.status).toBe(true);
	expect(result.data).toBeTypeOf("string");
});
