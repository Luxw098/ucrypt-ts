import type { UcryptType } from "../types/UcryptType";

//TODO: Create Web-Compatible file class
export default class file {
	private options: UcryptType["file"];
	public constructor(options: UcryptType["file"]) {
		this.options = options;
	}

	public encrypt() {
		throw new Error("Method not implemented.");
	}

	public decrypt() {
		throw new Error("Method not implemented.");
	}

	public compress(filePath: string) { 
		throw new Error("Method not implemented.");
	}

	public decompress(filePath: string) {
		throw new Error("Method not implemented.");
	}

	// TODO metadata scrambling / stripping meta
}

/*

file {
    encrypt: (filePath: string, key: string) => void;
    decrypt: (filePath: string, key: string) => void;
}

*/
