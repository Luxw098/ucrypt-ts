// This exists because MFA expects Base32 encoding not base64 which btoa and atob provide
// they are named a32 because btoa32 means Bytes to Ascii32, Its named like way because it used to convert to Ascii not Base.

export const b32 = {
	btoa32(buffer: Buffer): string {
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
		let result = "";
		let bits = 0;
		let value = 0;

		for (const byte of buffer) {
			value = (value << 8) | byte;
			bits += 8;

			while (bits >= 5) {
				result += alphabet[(value >>> (bits - 5)) & 31]!;
				bits -= 5;
			}
		}

		if (bits > 0) {
			result += alphabet[(value << (5 - bits)) & 31]!;
		}

		return result;
	},
	a32tob(base32: string): Buffer {
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
		base32 = base32.toUpperCase().replace(/=+$/, "");

		let bits = 0;
		let value = 0;
		const result: number[] = [];

		for (const char of base32) {
			const idx = alphabet.indexOf(char);
			if (idx === -1) continue; // Skip non-alphabet characters

			value = (value << 5) | idx;
			bits += 5;

			if (bits >= 8) {
				result.push((value >>> (bits - 8)) & 0xff);
				bits -= 8;
			}
		}

		return Buffer.from(result);
	}
};
