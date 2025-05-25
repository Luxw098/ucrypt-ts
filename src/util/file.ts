import fs from 'fs';
import Zlib from 'zlib';

import rsa from './rsa';

export default class file {
  private RSA = new rsa();

  encrypt(filePath: string, key: string) {
    try {
      const data = fs.readFileSync(filePath, { encoding: 'utf8' });
      const encrypted = this.RSA.encrypt(data, key);
      fs.writeFileSync(filePath, encrypted);
      return {
        status: true,
        result: encrypted,
      };
    } catch (err) {
      return {
        status: false,
        result: err,
      };
    }
  }

  decrypt(filePath: string, key: string) {
    try {
      const data = fs.readFileSync(filePath, { encoding: 'utf8' });
      const decrypted = this.RSA.decrypt(data, key);
      fs.writeFileSync(filePath, decrypted);
      return {
        status: true,
        result: decrypted,
      };
    } catch (err) {
      return {
        status: false,
        result: err,
      };
    }
  }

  compress(filePath: string) {
    try {
      const data = fs.readFileSync(filePath);
      const compressed = Zlib.gzipSync(data);
      fs.writeFileSync(filePath, compressed);
      return {
        status: true,
        result: compressed,
      };
    } catch (err) {
      return {
        status: false,
        result: err,
      };
    }
  }

  decompress(filePath: string) {
    try {
      const data = fs.readFileSync(filePath);
      const decompressed = Zlib.unzipSync(data);
      fs.writeFileSync(filePath, decompressed);
      return {
        status: true,
        result: decompressed,
      };
    } catch (err) {
      return {
        status: false,
        result: err,
      };
    }
  }

  // TODO metadata scrambling / stripping meta
}

/*

file {
    encrypt: (filePath: string, key: string) => void;
    decrypt: (filePath: string, key: string) => void;
}

*/
