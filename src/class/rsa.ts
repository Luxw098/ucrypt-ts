import { ReturnFalse, ReturnTrue, ReturnType } from "../types/ReturnType";
import { UcryptType } from "../types/UcryptType";
import rsa_key from "./rsa_key";

export default class rsa {
	public options: UcryptType["rsa"];
	public constructor(options: UcryptType["rsa"]) {
		this.options = options;
	}

	public async generateKeyPair(
		extractable: boolean,
		usages: KeyUsage[],
		gen_params_override: Partial<RsaHashedKeyGenParams | EcKeyGenParams> = {}
	): Promise<ReturnType<rsa_key>> {
		try {
			const gen_params = this.options.gen_params;
			Object.assign(gen_params, gen_params_override);
			const key_pair = await crypto.subtle.generateKey(gen_params, extractable, usages);

			const keypair = new rsa_key(this, [gen_params, extractable, usages], key_pair);

			return ReturnTrue(keypair);
		} catch (err) {
			return ReturnFalse(err as Error);
		}
	}

	// Create one-to-one Diffie-Hellman key exchange between two users
	// Create Tree-based group Diffie-Hellman key exchange between a group
}
