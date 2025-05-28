import { expect, test } from "bun:test";
import { defaults } from "../src/defaults";
import ucrypt from "../src";

const uc = new ucrypt(defaults);

// test("name", () => {
//     expect("name").toBe("name");
// });

test("rsa/generateKeyPair", async () => {
	const keyPair = await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]);
	expect(keyPair.status).toBe(true);
	expect(keyPair.data).toHaveProperty("privateKey");
	expect(keyPair.data).toHaveProperty("publicKey");
});

test("rsa/encrypt", async () => {
	const keyPair = await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]);
	if (!keyPair.status) return;

	const encryptedData = await uc.rsa.encrypt("Hello, RSA!", keyPair.data.publicKey);
	expect(encryptedData.status).toBe(true);
	expect(typeof encryptedData.data).toBe("string");
});

test("rsa/decrypt", async () => {
	const keyPair = await uc.rsa.generateKeyPair(true, ["encrypt", "decrypt"]);
	if (!keyPair.status) return;

	const encryptedData = await uc.rsa.encrypt("Hello, RSA!", keyPair.data.publicKey);
	if (!encryptedData.status) return;

	const decryptedData = await uc.rsa.decrypt(encryptedData.data, keyPair.data.privateKey);
	expect(decryptedData.status).toBe(true);
	expect(decryptedData.data).toBe("Hello, RSA!");
});