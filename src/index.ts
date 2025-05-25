import hash from "./util/hash.ts";
import file from "./util/file.ts";
import jwt from "./util/jwt.ts";
import rsa from "./util/rsa.ts";
import mfa from "./util/mfa.ts";
import type { UcryptType } from "./types/UcryptType.ts";
import { defaults } from "./defaults.ts";

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
		this.jwt = new jwt(this.options.jwt);
		this.rsa = new rsa(this.options.rsa);
		this.mfa = new mfa(this.options.mfa);
	}
}

/*
uc {
    hash {
        sha256: (data: string, algorithm: string) => string;
        sha512: (data: string, algorithm: string) => string;
        md5: (data: string, algorithm: string) => string;
    }
    file {
        encrypt: (filePath: string, key: string) => void;
        decrypt: (filePath: string, key: string) => void;
    }
    jwt {
        sign: (data: string, secret: string, options?: object) => string;
        verify: (token: string, secret: string) => { valid: boolean; data?: object };
    }
    rsa {
        generateKeyPair: (keySize: number) => { publicKey: string; privateKey: string };
        encrypt: (data: string, publicKey: string) => string;
        decrypt: (data: string, privateKey: string) => string;
    }
    mfa {
        generate: (secret: string) => string;
        verify: (code: string, secret: string) => boolean;
    }
}
*/
