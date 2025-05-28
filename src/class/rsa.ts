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
				this.options.genParams,
				extractable,
				usages
			);
			
			return ReturnTrue(key_pair);
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	public async encrypt(data: any, publicKey: CryptoKey): Promise<ReturnType<string>> {
		try {
			const encrypted_data = await crypto.subtle.encrypt(
				this.options.genParams.name,
				publicKey,
				new TextEncoder().encode(data)
			);

			return ReturnTrue(Buffer.from(encrypted_data).toString("base64"));
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	public async decrypt(data: string, privateKey: CryptoKey): Promise<ReturnType<string>> {
		try {
			const decrypted_Data = await crypto.subtle.decrypt(
				this.options.genParams.name,
				privateKey,
				Uint8Array.from(Buffer.from(data, "base64"))
			);

			return ReturnTrue(new TextDecoder().decode(decrypted_Data));
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}
}
