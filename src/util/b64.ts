export const b64 = {
	fromArrayBuffer(buffer: ArrayBuffer) {
		const binary = new TextDecoder().decode(new Uint8Array(buffer));
		return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
	},

	toArrayBuffer(base64Url: string) {
		let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		while (base64.length % 4) base64 += "=";
		const binary = atob(base64);

		const buffer = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) buffer[i] = binary.charCodeAt(i);

		return buffer;
	},

	encodeURL(text: unknown) {
		const base64 = btoa(JSON.stringify(text));

		return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
	},

	decodeURL(text: string) {
		let base64 = text.replace(/-/g, "+").replace(/_/g, "/");
		while (base64.length % 4) base64 += "=";

		return atob(base64);
	}
};
