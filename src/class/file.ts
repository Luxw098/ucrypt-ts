import { ReturnFalse, ReturnTrue, ReturnType } from "../types/ReturnType";
import type { UcryptType } from "../types/UcryptType";

import "../compression-polyfill";

export default class file {
	private options: UcryptType["file"];
	public constructor(options: UcryptType["file"]) {
		this.options = options;
	}

	public async encrypt(file: ArrayBuffer, key: string): Promise<ReturnType<Uint8Array>> {
		try {
			const keyMaterial = await crypto.subtle.importKey(
				"raw",
				new TextEncoder().encode(key),
				{ name: "PBKDF2" },
				false,
				["deriveKey"]
			);

			const salt = crypto.getRandomValues(new Uint8Array(this.options.salt_length));
			const cryptoKey = await crypto.subtle.deriveKey(
				{
					name: "PBKDF2",
					salt: salt,
					iterations: 100000,
					hash: this.options.algorithm
				},
				keyMaterial,
				{ name: "AES-GCM", length: 256 },
				false,
				["encrypt"]
			);

			const iv = crypto.getRandomValues(new Uint8Array(this.options.iv_length));

			const encrypted = await crypto.subtle.encrypt(
				{ name: "AES-GCM", iv: iv },
				cryptoKey,
				file
			);

			const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
			result.set(salt, 0);
			result.set(iv, salt.length);
			result.set(new Uint8Array(encrypted), salt.length + iv.length);

			return ReturnTrue(result);
		} catch (error) {
			return ReturnFalse(error as Error);
		}
	}

	public async decrypt(file: Uint8Array, key: string): Promise<ReturnType<ArrayBuffer>> {
		try {
			const keyMaterial = await crypto.subtle.importKey(
				"raw",
				new TextEncoder().encode(key),
				{ name: "PBKDF2" },
				false,
				["deriveKey"]
			);

			const salt_length = this.options.salt_length;
			const iv_length = this.options.iv_length;

			const [salt, iv, data] = [
				file.slice(0, salt_length),
				file.slice(salt_length, salt_length + iv_length),
				file.slice(salt_length + iv_length)
			];

			const derived_key = await crypto.subtle.deriveKey(
				{
					name: "PBKDF2",
					salt: salt,
					iterations: 100000,
					hash: this.options.algorithm
				},
				keyMaterial,
				{ name: "AES-GCM", length: 256 },
				false,
				["decrypt"]
			);

			const decrypted = await crypto.subtle.decrypt(
				{ name: "AES-GCM", iv: iv },
				derived_key,
				data
			);

			return ReturnTrue(decrypted);
		} catch (error) {
			return ReturnFalse(error as Error);
		}
	}

	public async compress(file: Uint8Array): Promise<ReturnType<Uint8Array>> {
		try {
			const stream = new globalThis.CompressionStream(this.options.format);
			const writable = stream.writable;
			const writer = writable.getWriter();

			await writer.write(file);
			await writer.close();

			const reader = stream.readable.getReader();
			const chunks: Uint8Array[] = [];

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			while (true) {
				const read = await reader.read();
				if (read.done) break;
				chunks.push(read.value as Uint8Array<ArrayBuffer>);
			}

			const compressed = new Uint8Array(
				chunks.reduce((acc, chunk) => acc + chunk.length, 0)
			);

			let offset = 0;
			for (const chunk of chunks) {
				compressed.set(chunk, offset);
				offset += chunk.length;
			}

			return ReturnTrue(compressed);
		} catch (error) {
			console.error("Compression error:", error);
			return ReturnFalse(error as Error);
		}
	}

	public async decompress(file: Uint8Array): Promise<ReturnType<Uint8Array>> {
		try {
			const stream = new DecompressionStream(this.options.format);
			const writable = stream.writable;
			const writer = writable.getWriter();

			await writer.write(file);
			await writer.close();

			const reader = stream.readable.getReader();
			const chunks: Uint8Array[] = [];
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				chunks.push(value);
			}

			const decompressed = new Uint8Array(
				chunks.reduce((acc, chunk) => acc + chunk.length, 0)
			);
			let offset = 0;
			for (const chunk of chunks) {
				decompressed.set(chunk, offset);
				offset += chunk.length;
			}

			return ReturnTrue(decompressed);
		} catch (error) {
			return ReturnFalse(error as Error);
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
