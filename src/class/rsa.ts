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
				this.options.Algorithm,
				extractable,
				usages
			);
			return ReturnTrue(key_pair);
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	public async encrypt(data: string, publicKey: CryptoKey): Promise<ReturnType<string>> {
		try {
			const encrypted_data = await crypto.subtle.encrypt(
				this.options.Algorithm,
				publicKey,
				Buffer.from(data)
			);
			return ReturnTrue(new Uint8Array(encrypted_data).toString());
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	public async decrypt(data: string, privateKey: CryptoKey): Promise<ReturnType<string>> {
		try {
			const decrypted_Data = await crypto.subtle.decrypt(
				this.options.Algorithm,
				privateKey,
				Buffer.from(data)
			);
			return ReturnTrue(new Uint8Array(decrypted_Data).toString());
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}
}
