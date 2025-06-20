// Create one-to-one Diffie-Hellman key exchange between two users
// Create Tree-based group Diffie-Hellman key exchange between a group

import { Return, ReturnType } from "../types/ReturnType";
import type { UcryptType } from "../types/UcryptType";

import "../compression-polyfill";

const isPrime = (n: number) => {
	for (let i = 2, s = Math.sqrt(n); i <= s; i++) if (n % i === 0) return false;
	return n;
};
function getPrime(min: number) {
	let p = 0;
	while (p == 0) {
		const max = min * min;
		const n = Math.floor(Math.random() * (max - min) + min);
		if (isPrime(n)) p = n;
	}
	return p;
}

const isRoot = (a: number, b: number) => {
	while (b !== 0) {
		const temp = b;
		b = a % b;
		a = temp;
	}
	return a;
};
function getRoot(p: number) {
	let g = 1;
	for (let i = 3; g == 1 && i < p; i += 2) if (isRoot(i, p - 1) === 1) g = i;
	return g;
}

interface Payload {
	p: number;
	g: number;
	s: number;
}
export default class exchange {
	private options: UcryptType["exchange"];
	public constructor(options: UcryptType["exchange"]) {
		this.options = options;
	}

	public start_exchange(): ReturnType<[Payload, a: number]> {
		try {
			const p = getPrime(this.options.prime_min);
			const g = getRoot(p);

			const a = crypto
				.getRandomValues(new Uint8Array(this.options.secret_length))
				.join("");

			const s = g ** parseInt(a) % p;

			return Return(true, [
				{
					p: p,
					g: g,
					s: s
				},
				a
			]);
		} catch (err) {
			return Return(false, err as Error);
		}
	}

	public finish_exchange(
		data: Payload,
		callback: (s: number) => void
	): ReturnType<number> {
		try {
			const b = crypto
				.getRandomValues(new Uint8Array(this.options.secret_length))
				.join("");

			const s = data.g ** parseInt(b) % data.p;
			const shared_secret = data.s ** parseInt(b) % data.p;

			callback(s);
			return Return(true, shared_secret);
		} catch (err) {
			return Return(false, err as Error);
		}
	}
}
