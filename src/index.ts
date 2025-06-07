import hash from "./class/hash";
import file from "./class/file";
// import jwt from "./class/jwt";
// import rsa from "./class/rsa";
import mfa from "./class/mfa";
import type { UcryptType } from "./types/UcryptType";
import { defaults } from "./defaults";
import rsa from "./class/rsa";
import jwt from "./class/jwt";
import { ReturnFalse, ReturnTrue, ReturnType } from "./types/ReturnType";
import { b32 } from "./util/b32";

export default class ucrypt {
	public hash;
	public file;
	public jwt;
	public rsa;
	public mfa;

	private options: UcryptType;
	public constructor(options: typeof this.options = {}) {
		this.options = {
			...defaults,
			...options
		};

		this.hash = new hash(this.options.hash);
		this.file = new file(this.options.file);
		this.mfa = new mfa(this.options.mfa);
		this.rsa = new rsa(this.options.rsa);
		this.jwt = new jwt(this.options.jwt);
	}

	public generateSecret(length: number): ReturnType<string> {
		try {
			const random_bytes = new Uint32Array(length);
			crypto.getRandomValues(random_bytes);
			return ReturnTrue(b32.btoa32(Buffer.from(random_bytes.buffer)));
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}
}

// Ekato, Reference moved to `types/UcryptType.ts`
