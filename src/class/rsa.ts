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
			const encrypted_data = await crypto.subtle.encrypt(
				this.options.gen_params.name,
				publicKey,
				new TextEncoder().encode(JSON.stringify(data))
			);

			return ReturnTrue(Buffer.from(encrypted_data).toString("base64"));
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	public async decrypt(data: string, privateKey: CryptoKey): Promise<ReturnType<string>> {
		try {
			const decrypted_data = await crypto.subtle.decrypt(
				this.options.gen_params.name,
				privateKey,
				Uint8Array.from(Buffer.from(data, "base64"))
			);

			return ReturnTrue(new TextDecoder().decode(decrypted_data));
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	// TODO: Rotate keypair for ID with previous keypair storage
	// Create one-to-one Diffie-Hellman key exchange between two users
	// Create Tree-based group Diffie-Hellman key exchange between a group
}
