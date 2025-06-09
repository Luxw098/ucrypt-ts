import { ReturnFalse, ReturnTrue, ReturnType } from "../types/ReturnType";
import type { UcryptType } from "../types/UcryptType";

import "../compression-polyfill";
import { AESKeypair } from "./aes";

export default class file {
	private options: UcryptType["file"];
	private aes: AESKeypair;
	public constructor(options: UcryptType["file"], aes: ReturnType<AESKeypair>) {
		this.options = options;

		if (!aes.status) throw new Error("AES keypair generation failed: ", aes.data);
		this.aes = aes.data;
	}

	public async encrypt(file: ArrayBuffer, key: string): Promise<ReturnType<Uint8Array>> {
		return this.aes.encrypt(file, key, this.options);
	}

	public async decrypt(file: Uint8Array, key: string): Promise<ReturnType<ArrayBuffer>> {
		return this.aes.decrypt(file, key, this.options);
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
