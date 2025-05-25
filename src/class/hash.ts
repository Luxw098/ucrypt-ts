import crypto, { type BinaryToTextEncoding } from "crypto";
import { ReturnFalse, ReturnTrue, type ReturnType } from "../types/ReturnType";
import type { UcryptType } from "../types/UcryptType";

export default class hash {
	private options: UcryptType["hash"];
	public constructor(options: UcryptType["hash"]) {
		this.options = options;
	}
	public digest(data: string, type: BinaryToTextEncoding = "hex"): ReturnType<string> {
		try {
			const hash = crypto.createHash(this.options.algorithm).update(data).digest(type);
			return ReturnTrue(hash);
		} catch {
			return ReturnFalse(new Error("Failed to create hash"));
		}
	}
}

/*
    hash: (data: string, algorithm: string) => string;
        sha512: (data: string, algorithm: string) => string;
        md5: (data: string, algorithm: string) => string;
        salt: (hash: string, salt: string) => string;
    }
*/
