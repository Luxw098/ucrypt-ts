import type { UcryptType } from "../types/UcryptType";

export default class jwt {
	private options: UcryptType["jwt"];

	public constructor(options: UcryptType["jwt"]) {
		this.options = options;
	}

	public sign() {
		throw new Error("Method not implemented.");
	}

	public verify() {
		throw new Error("Method not implemented.");
	}
}
