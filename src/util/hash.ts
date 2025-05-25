import crypto from 'crypto';

export default class hash {
    public sha256 = (data: string) => crypto.createHash('sha256').update(data).digest('hex');
    public sha512 = (data: string) => crypto.createHash('sha512').update(data).digest('hex');
    public md5 = (data: string) => crypto.createHash('md5').update(data).digest('hex');
}

/*
    hash: (data: string, algorithm: string) => string;
        sha512: (data: string, algorithm: string) => string;
        md5: (data: string, algorithm: string) => string;
        salt: (hash: string, salt: string) => string;
    }
*/