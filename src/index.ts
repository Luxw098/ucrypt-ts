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
import aes from "./class/aes";
import exchange from "./class/exchange";

export default class ucrypt {
	public hash: hash;
	public exchange: exchange;
	public jwt: jwt;
	public rsa: rsa;
	public aes: aes;
	public file: file;
	public mfa: mfa;

	private options: UcryptType;
	public constructor(options: Partial<typeof this.options> = {}) {
		this.options = {
			...defaults,
			...options
		};

		this.hash = new hash(this.options.hash);
		this.exchange = new exchange(this.options.exchange);
		this.jwt = new jwt(this.options.jwt);
		this.rsa = new rsa(this.options.rsa);
		this.aes = new aes(this.options.aes);
		this.file = new file(this.options.file, this.aes.generateKeyPair());
		this.mfa = new mfa(this.options.mfa);
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
