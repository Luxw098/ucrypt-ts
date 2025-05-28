import node_crypto from "crypto";
const web_crypto = globalThis.crypto;

export const cryptoTranslator =
	typeof window != "undefined" ? web_crypto : node_crypto.webcrypto;
