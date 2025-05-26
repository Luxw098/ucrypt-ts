import hash from "./class/hash";
import file from "./class/file";
// import jwt from "./class/jwt";
// import rsa from "./class/rsa";
import mfa from "./class/mfa";
import type { UcryptType } from "./types/UcryptType";
import { defaults } from "./defaults";

export default class ucrypt {
	public hash;
	public file;
	public jwt;
	public rsa;
	public mfa;

	private options: UcryptType;
	public constructor(options: typeof this.options) {
		this.options = {
			...defaults,
			...options
		};

		this.hash = new hash(this.options.hash);
		this.file = new file(this.options.file);
		this.mfa = new mfa(this.options.mfa);
		this.rsa = "";
		//this.rsa = new rsa(this.options.rsa);
		this.jwt = "";
		// this.jwt = new jwt(this.options.jwt);
	}
}

// Ekato, Reference moved to `types/UcryptType.ts`
