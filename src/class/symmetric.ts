import { Return, ReturnType } from "../types/ReturnType";
import type { UcryptType } from "../types/UcryptType";

import "../compression-polyfill";

class SymmetricKey {
	private lastRotation = Date.now();

	public options: symmetric["options"];
	public keys: {
		p: string | null;
		c: string;
	};
	// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
	public exchange_function: (keys: typeof this.keys) => Promise<void> = async _ => {
		return;
	};

	public constructor(options: symmetric["options"], key: string) {
		this.options = options;
		this.keys = {
			p: null,
			c: key
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

	public rotate(): ReturnType<typeof this.keys.c> {
		try {
			if (Date.now() - this.lastRotation > this.options.rotation_cooldown * 60 * 1000)
				throw new Error("Rotation cooldown not met");

			const result = crypto
				.getRandomValues(new Uint8Array(this.options.key_length))
				.join("");

			this.keys.p = this.keys.c;
			this.keys.c = result;

			return Return(true, result);
		} catch (err) {
			return Return(false, err as Error);
		}
	}

	public async encrypt(
		file: ArrayBuffer,
		key_override: string | null = null,
		options?: Record<string, unknown>
	): Promise<ReturnType<Uint8Array>> {
		const key = key_override ?? this.keys.c;
		const local_options = {
			...options,
			...this.options
		};
		try {
			const keyMaterial = await crypto.subtle.importKey(
				"raw",
				new TextEncoder().encode(key),
				{ name: local_options.padding },
				false,
				["deriveKey"]
			);

			const salt = crypto.getRandomValues(new Uint8Array(local_options.salt_length));
			const cryptoKey = await crypto.subtle.deriveKey(
				{
					name: local_options.padding,
					salt: salt,
					iterations: 100000,
					hash: local_options.hash_algorithm
				},
				keyMaterial,
				{ name: local_options.algorithm, length: 256 },
				false,
				["encrypt"]
			);

			const iv = crypto.getRandomValues(new Uint8Array(local_options.iv_length));

			const encrypted = await crypto.subtle.encrypt(
				{ name: local_options.algorithm, iv: iv },
				cryptoKey,
				file
			);

			const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
			result.set(salt, 0);
			result.set(iv, salt.length);
			result.set(new Uint8Array(encrypted), salt.length + iv.length);

			return Return(true, result);
		} catch (err) {
			if (!this.keys.p || key == this.keys.p) return Return(false, err as Error);

			const previous_key = await this.encrypt(file, this.keys.p);
			if (previous_key.status) return Return(true, previous_key.data);
			else return Return(false, err as Error);
		}
	}

	public async decrypt(
		file: Uint8Array,
		key_override: string | null = null,
		options?: Record<string, unknown>
	): Promise<ReturnType<ArrayBuffer>> {
		const local_options = {
			...options,
			...this.options
		};

		const key = key_override ?? this.keys.c;
		const salt_length = local_options.salt_length;
		const iv_length = local_options.iv_length;

		const [salt, iv, data] = [
			file.slice(0, salt_length),
			file.slice(salt_length, salt_length + iv_length),
			file.slice(salt_length + iv_length)
		];

		try {
			const keyMaterial = await crypto.subtle.importKey(
				"raw",
				new TextEncoder().encode(key),
				{ name: local_options.padding },
				false,
				["deriveKey"]
			);

			const derived_key = await crypto.subtle.deriveKey(
				{
					name: local_options.padding,
					salt: salt,
					iterations: 100000,
					hash: local_options.hash_algorithm
				},
				keyMaterial,
				{ name: local_options.algorithm, length: 256 },
				false,
				["decrypt"]
			);

			const decrypted = await crypto.subtle.decrypt(
				{ name: local_options.algorithm, iv: iv },
				derived_key,
				data
			);

			return Return(true, decrypted);
		} catch (err) {
			if (!this.keys.p || key == this.keys.p) return Return(false, err as Error);

			const previous_key = await this.decrypt(file, this.keys.p);

			if (previous_key.status) return Return(true, previous_key.data);
			else return Return(false, err as Error);
		}
	}
}
export { SymmetricKey };

export default class symmetric {
	private options: UcryptType["symmetric"];
	public constructor(options: UcryptType["symmetric"]) {
		this.options = options;
	}

	public generateKeyPair(): ReturnType<SymmetricKey> {
		try {
			const result = new SymmetricKey(
				this.options,
				crypto.getRandomValues(new Uint8Array(this.options.key_length)).join("")
			);

			return Return(true, result);
		} catch (err) {
			return Return(false, err as Error);
		}
	}
}
