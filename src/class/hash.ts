import { ReturnFalse, ReturnTrue, type ReturnType } from "../types/ReturnType";
import type { UcryptType } from "../types/UcryptType";

export default class hash {
	private options: UcryptType["hash"];
	public constructor(options: UcryptType["hash"]) {
		this.options = options;
	}
	public async digest(data: string): Promise<ReturnType<string>> {
		try {
			const hash = await crypto.subtle.digest(
				this.options.algorithm,
				new TextEncoder().encode(data)
			);
			return ReturnTrue(new Uint8Array(hash).toString());
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
