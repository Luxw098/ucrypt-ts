import { Return, ReturnType } from "../types/ReturnType";
import { UcryptType } from "../types/UcryptType";

class AsymmetricKeys {
	private lastRotation = Date.now();

	public options: asymmetric["options"];
	public keyopts: unknown[];
	public keys: {
		p: CryptoKeyPair | null;
		c: CryptoKeyPair;
	};
	// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
	public exchange_function: (keys: typeof this.keys) => Promise<void> = async _ => {
		return;
	};

	public constructor(
		options: asymmetric["options"],
		key_options: unknown[],
		keypair: CryptoKeyPair
	) {
		this.options = options;
		this.keyopts = key_options;
		this.keys = {
			p: null,
			c: keypair
		};

		if (this.options.key_rotation != -1) {
			setInterval(
				self => {
					void self.rotate();
				},
				options.key_rotation * 60 * 1000,
				this
			);
		}
	}

	public async rotate(): Promise<ReturnType<typeof this.keys.c>> {
		try {
			if (Date.now() - this.lastRotation > this.options.rotation_cooldown * 60 * 1000)
				throw new Error("Rotation cooldown not met");

			const result = await crypto.subtle.generateKey(
				this.keyopts[0] as RsaHashedKeyGenParams | EcKeyGenParams,
				this.keyopts[1] as boolean,
				this.keyopts[2] as KeyUsage[]
			);
			this.keys.p = this.keys.c;
			this.keys.c = result;

			this.lastRotation = Date.now();

			return Return(true, result);
		} catch (err) {
			return Return(false, err as Error);
		}
	}

	public async encrypt(
		data: unknown,
		publicKey?: CryptoKey
	): Promise<ReturnType<string>> {
		const key = publicKey ?? this.keys.c.publicKey;
		try {
			const encrypted_data: string[] = [];
			const chunks = JSON.stringify(data).match(/[\s\S]{1,110}/g);
			if (!chunks) return Return(false, new Error("Data is too large to encrypt"));
			for (const chunk of chunks) {
				const encrypted_chunk = await crypto.subtle.encrypt(
					this.options.gen_params,
					key,
					new TextEncoder().encode(chunk)
				);

				encrypted_data.push(Buffer.from(encrypted_chunk).toString("base64"));
			}

			return Return(true, encrypted_data.join("|"));
		} catch (err) {
			if (!this.keys.p || key == this.keys.p.publicKey)
				return Return(false, err as Error);

			const previous_key = await this.encrypt(data, this.keys.p.publicKey);
			if (previous_key.status) return Return(true, previous_key.data);
			else return Return(false, err as Error);
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
					this.options.gen_params,
					key,
					decoded_chunk
				);

				decrypted_data.push(decoder.decode(decrypted_chunk));
			}

			return Return(true, JSON.parse(decrypted_data.join("")));
		} catch (err) {
			if (!this.keys.p || key == this.keys.p.privateKey)
				return Return(false, err as Error);

			const previous_key = await this.decrypt(data, this.keys.p.privateKey);
			if (previous_key.status) return Return(true, previous_key.data);
			else return Return(false, err as Error);
		}
	}
}
export { AsymmetricKeys };

export default class asymmetric {
	public options: UcryptType["asymmetric"];
	public constructor(options: UcryptType["asymmetric"]) {
		this.options = options;
	}

	public async generateKeyPair(
		extractable: boolean,
		usages: KeyUsage[],
		gen_params_override: Partial<RsaHashedKeyGenParams | EcKeyGenParams> = {}
	): Promise<ReturnType<AsymmetricKeys>> {
		try {
			const gen_params = this.options.gen_params;
			Object.assign(gen_params, gen_params_override);
			const crypto_keys = await crypto.subtle.generateKey(
				gen_params,
				extractable,
				usages
			);

			const keys = new AsymmetricKeys(
				this.options,
				[gen_params, extractable, usages],
				crypto_keys
			);

			return Return(true, keys);
		} catch (err) {
			return Return(false, err as Error);
		}
	}
}
