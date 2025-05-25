import { expect, test } from 'bun:test';
import ucrypt from "../src/index.ts";

const uc = new ucrypt({});

// test("name", () => {
//     expect("value").toBe("expectedValue");
// });



test("compress", () => {
    const fileData = uc.file.compress("./file.spec.json");
    
    expect("value").toBe("expectedValue");
});