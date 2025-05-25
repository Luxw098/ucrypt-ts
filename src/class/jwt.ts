import type { UcryptType } from "../types/UcryptType";

// I made a Dev branch please use it!
// Im going to push this into dev and make a PR to main
// Can you accept the PR for me?

// Anywho, Id like you to finish this and go make the jwt.spec.ts test file :3
// Please do it the way I made the other 3 .spec.ts files, <3

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
