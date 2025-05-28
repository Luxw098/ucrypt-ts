import fs from "fs";
import Zlib from "zlib";

import { ReturnFalse, ReturnTrue } from "../types/ReturnType";
import type { UcryptType } from "../types/UcryptType";

export default class file {
	private options: UcryptType["file"];
	public constructor(options: UcryptType["file"]) {
		this.options = options;
	}

	public encrypt() {
		// TODO: Implement file encryption
		// Using crypto module for encryption
	}

	public decrypt() {
		// TODO: Implement file decryption
		// Using crypto module for decryption
	}

	public compress(filePath: string) { 
		//TODO: Make web compatible
		try {
			const data = fs.readFileSync(filePath);
			const compressed = Zlib.gzipSync(data, this.options);
			fs.writeFileSync(filePath, compressed);
			return ReturnTrue(compressed);
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	public decompress(filePath: string) {
		try {
			const data = fs.readFileSync(filePath);
			const decompressed = Zlib.gunzipSync(data, this.options);
			fs.writeFileSync(filePath, decompressed);
			return ReturnTrue(decompressed);
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	// TODO metadata scrambling / stripping meta
}

/*

file {
    encrypt: (filePath: string, key: string) => void;
    decrypt: (filePath: string, key: string) => void;
}

*/
