import { Return, type ReturnType } from "../types/ReturnType";
import type { UcryptType } from "../types/UcryptType";

export default class hash {
	private options: UcryptType["hash"];
	public constructor(options: UcryptType["hash"]) {
		this.options = options;
	}
	public async digest(data: string): Promise<ReturnType<string>> {
		try {
			const buffer = await crypto.subtle.digest(
				this.options.algorithm,
				new TextEncoder().encode(data)
			);
			const hash = Array.from(new Uint8Array(buffer))
				.map(b => b.toString(16).padStart(2, "0"))
				.join("");
			return Return(true, hash);
		} catch {
			return Return(false, new Error("Failed to create hash"));
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
