import hash from './util/hash.ts';
import file from './util/file.ts';
import jwt from './util/jwt.ts';
import rsa from './util/rsa.ts';
import mfa from './util/mfa.ts';

export default class ucrypt {
  public defaults: Record<string, unknown> = {};
  public constructor(defaults: typeof this.defaults) {
    this.defaults = {
      // defaults here
      hash: 'sha256',
      ...defaults,
    };
  }

  public hash = new hash();
  public file = new file();
  public jwt = new jwt();
  public rsa = new rsa();
  public mfa = new mfa();
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
