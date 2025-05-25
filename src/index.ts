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
		this.jwt = "";
		// this.jwt = new jwt(this.options.jwt);
		this.rsa = "";
		// this.rsa = new rsa(this.options.rsa);
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
