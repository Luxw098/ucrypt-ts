import { cryptoTranslator as crypto } from "../translations/CryptoTranslator";
import { ReturnFalse, ReturnTrue, ReturnType } from "../types/ReturnType";
import { UcryptType } from "../types/UcryptType";
export default class rsa {
	public options: UcryptType["rsa"];
	public constructor(options: UcryptType["rsa"]) {
		this.options = options;
	}

	public async generateKeyPair(
		extractable: boolean,
		usages: KeyUsage[]
	): Promise<ReturnType<CryptoKeyPair>> {
		try {
			const key_pair = await crypto.subtle.generateKey(
				this.options.gen_params,
				extractable,
				usages
			);

			return ReturnTrue(key_pair);
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	public async encrypt(data: unknown, publicKey: CryptoKey): Promise<ReturnType<string>> {
		try {
			const encrypted_data: string[] = [];
			const chunks = JSON.stringify(data).match(/[\s\S]{1,110}/g);
			if (!chunks) return ReturnFalse(new Error("Data is too large to encrypt"));
			for (const chunk of chunks) {
				const encrypted_chunk = await crypto.subtle.encrypt(
					this.options.gen_params.name,
					publicKey,
					new TextEncoder().encode(chunk)
				);

				encrypted_data.push(Buffer.from(encrypted_chunk).toString("base64"));
			}

			return ReturnTrue(encrypted_data.join("|"));
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	public async decrypt(data: string, privateKey: CryptoKey): Promise<ReturnType<string>> {
		try {
			const decrypted_data = [];
			const decoder = new TextDecoder();
			const chunks = data.split("|");
			for (const chunk of chunks) {
				const decoded_chunk = Buffer.from(chunk, "base64");
				const decrypted_chunk = await crypto.subtle.decrypt(
					this.options.gen_params.name,
					privateKey,
					decoded_chunk
				);

				decrypted_data.push(decoder.decode(decrypted_chunk));
			}
			return ReturnTrue(JSON.parse(decrypted_data.join("")));
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	// TODO: Rotate keypair for ID with previous keypair storage
	// Create one-to-one Diffie-Hellman key exchange between two users
	// Create Tree-based group Diffie-Hellman key exchange between a group
}
