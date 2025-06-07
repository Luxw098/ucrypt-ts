import { ReturnFalse, ReturnTrue, ReturnType } from "../types/ReturnType";
import rsa from "./rsa";

export default class rsa_key {
	public keyopts: unknown[];
	public keys: {
		p: CryptoKeyPair | null;
		c: CryptoKeyPair;
	};

	public rsa: rsa;
	public constructor(rsa: rsa, keyopts: unknown[], keypair: CryptoKeyPair) {
		this.rsa = rsa;
		this.keyopts = keyopts;
		this.keys = {
			p: null,
			c: keypair
		};

		if (this.rsa.options.key_rotation != -1) {
			setInterval(
				self => {
					void self.rotate();
				},
				this.rsa.options.key_rotation,
				this
			);
		}
	}

	public async rotate() {
		const result = await crypto.subtle.generateKey(
			this.keyopts[0] as RsaHashedKeyGenParams | EcKeyGenParams,
			this.keyopts[1] as boolean,
			this.keyopts[2] as KeyUsage[]
		);
		this.keys.p = this.keys.c;
		this.keys.c = result;
	}

	public async encrypt(
		data: unknown,
		publicKey?: CryptoKey
	): Promise<ReturnType<string>> {
		const key = publicKey ?? this.keys.c.publicKey;
		try {
			const encrypted_data: string[] = [];
			const chunks = JSON.stringify(data).match(/[\s\S]{1,110}/g);
			if (!chunks) return ReturnFalse(new Error("Data is too large to encrypt"));
			for (const chunk of chunks) {
				const encrypted_chunk = await crypto.subtle.encrypt(
					this.rsa.options.gen_params,
					key,
					new TextEncoder().encode(chunk)
				);

				encrypted_data.push(Buffer.from(encrypted_chunk).toString("base64"));
			}

			return ReturnTrue(encrypted_data.join("|"));
		} catch (err) {
			if (!this.keys.p || key == this.keys.p.publicKey) return ReturnFalse(err as Error);

			const previous_key = await this.encrypt(data, this.keys.p.publicKey);
			if (previous_key.status) return ReturnTrue(previous_key);
			else return ReturnFalse(err as Error);
		}
	}

	public async decrypt(
		data: string,
		privateKey?: CryptoKey
	): Promise<ReturnType<string>> {
		const key = privateKey ?? this.keys.c.privateKey;
		try {
			const decrypted_data = [];
			const decoder = new TextDecoder();
			const chunks = data.split("|");
			for (const chunk of chunks) {
				const decoded_chunk = Buffer.from(chunk, "base64");
				const decrypted_chunk = await crypto.subtle.decrypt(
					this.rsa.options.gen_params,
					key,
					decoded_chunk
				);

				decrypted_data.push(decoder.decode(decrypted_chunk));
			}

			return ReturnTrue(JSON.parse(decrypted_data.join("")));
		} catch (err) {
			if (!this.keys.p || key == this.keys.p.privateKey) return ReturnFalse(err as Error);

			const previous_key = await this.decrypt(data, this.keys.p.privateKey);
			if (previous_key.status) return ReturnTrue(previous_key.data);
			else return ReturnFalse(err as Error);
		}
	}
}
