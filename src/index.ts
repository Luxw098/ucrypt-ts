import hash from "./class/hash";
import file from "./class/file";
import mfa from "./class/mfa";
import type { UcryptType } from "./types/UcryptType";
import { defaults } from "./defaults";
import asymmetric from "./class/asymmetric";
import jwt from "./class/jwt";
import { Return, ReturnType } from "./types/ReturnType";
import { b32 } from "./util/b32";
import symmetric from "./class/symmetric";
import exchange from "./class/exchange";

export default class ucrypt {
	public hash: hash;
	public exchange: exchange;
	public jwt: jwt;
	public asymmetric: asymmetric;
	public symmetric: symmetric;
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
		this.asymmetric = new asymmetric(this.options.asymmetric);
		this.symmetric = new symmetric(this.options.symmetric);
		this.file = new file(this.options.file, this.symmetric.generateKeyPair());
		this.mfa = new mfa(this.options.mfa);
	}

	public generateSecret(length: number): ReturnType<string> {
		try {
			const random_bytes = new Uint32Array(length);
			crypto.getRandomValues(random_bytes);
			return Return(true, b32.btoa32(Buffer.from(random_bytes.buffer)));
		} catch (err) {
			return Return(false, err as Error);
		}
	}
}

// Ekato, Reference moved to `types/UcryptType.ts`
