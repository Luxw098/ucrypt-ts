---

---


## **Overview**

---

- **Hashing** - Secure data hashing with various algorithms
- **File Handling** - Encryption, decryption, compression, and decompression
- **Json Web Tokens** - Token signing and verification
- **MFA** - TOTP-Based code generation and validation
- **Asymmetric Encryption** - Key generation, encryption/decryption, and key rotation
- **Symmetric Encryption** - AES encryption/decryption and key rotation
- **Key Exchange** - Diffie-Hellman key exchange


## **Installation**

---

```shell
# Using bun
bun add ucrypt-ts

# Using npm
npm install ucrypt-ts
```

## **Getting Started**

---

```ts
// Typescript 
import ucrypt from 'ucrypt-ts';

const crypt = new ucrypt({
    // Your client configuration options
    // This is optional - defaults will be used if not provided
});
```


## **Examples**

---

<details>
<summary><div class="apiref">Hashing implementation</div></summary>

<div markdown="1">

```ts
const crypto = new ucrypt();
const known_hash = "1d08c598430d2d8d98fa3d3f49e8dca331daa818958d8bf0dbfa2aa384d8a7fd";
const hash_result = await crypto.hash.digest("sensitive data");
if (hash_result.status) {
    const hash = hash_result.data as string;
    console.log("HASH Valid:", known_hash === hash);
} else {
    console.error("Hash failed:", hash_result.data);
}
```
</div>
</details>


<details>
<summary><div class="apiref">JWT Token Generation and Verification</div></summary>

<div markdown="1">

```ts
const crypto = new ucrypt();
const secret_result = crypto.generateSecret(16);
if (secret_result.status) {
    const jwt_secret = secret_result.data as string;
    const token_result = await crypto.jwt.sign({ userId: 123 }, jwt_secret);
    if (token_result.status) {
        const jwt_token = token_result.data as string;
        const verification_result = await crypto.jwt.verify(jwt_token, jwt_secret);
        console.log("JWT Valid:", verification_result.status && verification_result.data);
    }
}
```
</div>
</details>


<details>
<summary><div class="apiref">2FA Code Generation and Verification</div></summary>

<div markdown="1">

```ts
const crypto = new ucrypt();
const secret_result = crypto.generateSecret(16);
if (secret_result.status) {
    const mfa_secret = secret_result.data as string;
    const code_result = await crypto.mfa.generateTOTP(mfa_secret);
    if (code_result.status) {
        const mfa_code = code_result.data as string;
        const verification_result = await crypto.mfa.verifyTOTP(mfa_code, mfa_secret);
        console.log("2FA Valid:", verification_result.status && verification_result.data);
    }
}
```
</div>
</details>


<details>
<summary><div class="apiref">Asymmetric Encryption and Decryption</div></summary>

<div markdown="1">

```ts
const crypto = new ucrypt();
const keypair_result = await crypto.asymmetric.generateKeyPair(true, ["encrypt", "decrypt"]);
if (keypair_result.status) {
    const keypair = keypair_result.data;
    const encrypted_result = await keypair.encrypt("secret data");
    if (encrypted_result.status) {
        const decrypted_result = await keypair.decrypt(encrypted_result.data as string);
        if (decrypted_result.status) {
            console.log("Decrypted:", decrypted_result.data);
        }
    }
}
```
</div>
</details>


<details>
<summary><div class="apiref">Symmetric Encryption and Decryption</div></summary>

<div markdown="1">

```ts
const crypto = new ucrypt();
const keypair_result = crypto.symmetric.generateKeyPair();
if (keypair_result.status) {
    const keypair = keypair_result.data;
    const data = new TextEncoder().encode("secret data");
    const encrypted_result = await keypair.encrypt(data);
    if (encrypted_result.status) {
        const decrypted_result = await keypair.decrypt(encrypted_result.data as Uint8Array);
        if (decrypted_result.status) {
            console.log("Decrypted:", new TextDecoder().decode(decrypted_result.data as ArrayBuffer));
        }
    }
}
```
</div>
</details>


<details>
<summary><div class="apiref">Key Exchange</div></summary>

<div markdown="1">

```ts
const crypto = new ucrypt();

// Start exchange for Alice
const alice_exchange = crypto.exchange.start_exchange();
if (alice_exchange.status) {
    const [alice_public_data, alice_private_key] = alice_exchange.data;
    
    // Bob receives Alice's public data and finishes the exchange
    const bob_shared_secret = crypto.exchange.finish_exchange(
        alice_public_data,
        (bob_public_value) => {
            // This callback provides Bob's public value to send back to Alice
            console.log("Bob's public value:", bob_public_value);
        }
    );
    
    if (bob_shared_secret.status) {
        console.log("Shared secret established:", bob_shared_secret.data);
    } else {
        console.error("Exchange failed:", bob_shared_secret.data);
    }
} else {
    console.error("Alice exchange failed:", alice_exchange.data);
}
```

</div>
</details>


<details>
<summary><div class="apiref">File Encryption and Decryption</div></summary>

<div markdown="1">

```ts
const crypto = new ucrypt();
const file_data = new TextEncoder().encode("file content");
const secret_key = "my-secret-key";

// Encrypt file
const encrypted_result = await crypto.file.encrypt(file_data.buffer, secret_key);
if (encrypted_result.status) {
    const encrypted_data = encrypted_result.data as Uint8Array;
    
    // Decrypt file
    const decrypted_result = await crypto.file.decrypt(encrypted_data, secret_key);
    if (decrypted_result.status) {
        const decrypted_content = new TextDecoder().decode(decrypted_result.data as ArrayBuffer);
        console.log("File content:", decrypted_content);
    }
}
```
</div>
</details>


## **Configuration**

---

<details>
<summary><div class="apiref">Config Options</div></summary>

<div markdown="1">
> You can customize ucrypt's behavior by passing a configuration object to the constructor. Here's the structure of the configuration:



```ts
interface UcryptType {
  hash: {
    algorithm: SupportedCryptoAlgorithms;
    salt: boolean;
    pepper: boolean;
  };
  exchange: {
    prime_min: number;
    secret_length: number;
  };
  jwt: {
    algorithm: "HS256" | "HS512" | "RS256";
    hash: SupportedCryptoAlgorithms;
    expires_after: string;
  };
  asymmetric: {
    key_size: number;
    gen_params: RsaHashedKeyGenParams;
    key_rotation: number;
    rotation_cooldown: number;
  };
  symmetric: {
    hash_algorithm: SupportedCryptoAlgorithms;
    salt_length: number;
    iv_length: number;
    algorithm: string;
    padding: string;
    key_length: number;
    key_rotation: number;
    rotation_cooldown: number;
  };
  mfa: {
    hash_algorithm: SupportedCryptoAlgorithms;
    digits: number;
    period: number;
  };
  file: {
    format: CompressionFormat;
    chunk_size: number;
    hash_algorithm: SupportedCryptoAlgorithms;
    salt_length: number;
    iv_length: number;
  };
}
```

Default configuration is applied for any options not explicitly provided.
</div>
</details>


## **API Reference**

---

<details>
<summary><div class="apiref"> ucrypt.hash#digest</div></summary>

<div markdown="1"> 
> **Description:** Hash a piece of data.
> 
> **Parameters:**
> - `data` ( *string* ): The data to hash.
> 
> **Returns:**  
> - `hash` ( *string* ): The hash string.
</div>
</details>

<br>

<details>
<summary><div class="apiref"> ucrypt.file#encrypt</div></summary>

<div markdown="1"> 
> > **Description:** Encrypt a file's data.
> 
> **Parameters:**
> - `data` ( *ArrayBuffer* ): The file data's ArrayBuffer to encrypt.
> - `key` ( *string* ): The secret used for encryption.
> 
> **Returns:**  
> - `encrypted_data` ( *Uint8Array* ): The resulting encrypted data.
</div>
</details>

<details>
<summary><div class="apiref"> ucrypt.file#decrypt</div></summary>

<div markdown="1"> 
> > **Description:** Decrypt a file's data.
> 
> **Parameters:**
> - `data` ( *Uint8Array* ): The encrypted Uint8Array to decrypt.
> - `key` ( *string* ): The secret used for encryption.
> 
> **Returns:**  
> - `decrypted_data` ( *ArrayBuffer* ): The resulting decrypted data.
</div>
</details>

<details>
<summary><div class="apiref"> ucrypt.file#compress</div></summary>

<div markdown="1"> 
> > **Description:** Compress a file's data.
> 
> **Parameters:**
> - `data` ( *Uint8Array* ): The data to compress.
> 
> **Returns:**  
> - `compressed_data` ( *Uint8Array* ): The resulting compressed data.
</div>
</details>

<details>
<summary><div class="apiref"> ucrypt.file#decompress</div></summary>

<div markdown="1"> 
> > **Description:** Decompress a file's data.
> 
> **Parameters:**
> - `data` ( *Uint8Array* ): The compressed data to decompress.
> 
> **Returns:**  
> - `decompressed_data` ( *Uint8Array* ): The resulting decompressed data.
</div>
</details>

<br>

<details>
<summary><div class="apiref"> ucrypt.jwt#sign</div></summary>

<div markdown="1"> 
> > **Description:** Sign data to create a JWT token.
> 
> **Parameters:**
> - `data` ( *JWTPayloadType* ): The payload data to sign.
> - `secret` ( *string* ): The secret key used for signing.
> 
> **Returns:**  
> - `token` ( *string* ): The resulting JWT token.
</div>
</details>

<details>
<summary><div class="apiref"> ucrypt.jwt#verify</div></summary>


<div markdown="1"> 
> > **Description:** Verify a JWT token's signature.
> 
> **Parameters:**
> - `token` ( *string* ): The JWT token to verify.
> - `secret` ( *string* ): The secret key used for verification.
> 
> **Returns:**  
> - `valid` ( *boolean* ): Whether the token is valid.
</div>
</details>

<br>

<details>
<summary><div class="apiref"> ucrypt.mfa#generateTOTP</div></summary>

<div markdown="1"> 
> > **Description:** Generate a TOTP (Time-based One-Time Password) code.
> 
> **Parameters:**
> - `secret` ( *string* ): The secret key used for TOTP generation.
> - `interval` ( *number*, optional): Interval offset.
> 
> **Returns:**  
> - `code` ( *string* ): The resulting TOTP code.
</div>
</details>

<details>
<summary><div class="apiref"> ucrypt.mfa#verifyTOTP</div></summary>

<div markdown="1"> 
> > **Description:** Verify a TOTP code against a secret.
> 
> **Parameters:**
> - `code` ( *string* ): The TOTP code to verify.
> - `secret` ( *string* ): The secret key used for verification.
> 
> **Returns:**  
> - `valid` ( *boolean* ): Whether the TOTP code is valid.
</div>
</details>

<br>

<details>
<summary><div class="apiref"> ucrypt.asymmetric#generateKeyPair</div></summary>

<div markdown="1"> 
> > **Description:** Generate an asymmetric key pair for encryption/decryption.
> 
> **Parameters:**
> - `extractable` ( *boolean* ): Whether the key is extractable.
> - `usages` ( *KeyUsage[]* ): Array of allowed key usages.
> - `gen_params_override?` ( *Partial<RsaHashedKeyGenParams | EcKeyGenParams>* ): Override for key generation parameters.
> 
> **Returns:**  
> - `key_pair` ( *AsymmetricKeys* ): The generated asymmetric key pair.
</div>
</details>

<details>
<summary><div class="apiref"> ucrypt.AsymmetricKeys#encrypt</div></summary>

<div markdown="1"> 
> > **Description:** Encrypt data using asymmetric public key.
> 
> **Parameters:**
> - `data` ( *unknown* ): The data to encrypt.
> - `publicKey?` ( *CryptoKey* ):  Override for stored public key.
> 
> **Returns:**  
> - `encrypted_data` ( *string* ): The resulting encrypted data.
</div>
</details>

<details>
<summary><div class="apiref"> ucrypt.AsymmetricKeys#decrypt</div></summary>

<div markdown="1"> 
> > **Description:** Decrypt data using asymmetric private key.
> 
> **Parameters:**
> - `data` ( *string* ): The encrypted data to decrypt.
> - `privateKey?` ( *CryptoKey* ): Override for stored private key.
> 
> **Returns:**  
> - `decrypted_data` ( *string* ): The resulting decrypted data.
</div>
</details>

<details>
<summary><div class="apiref"> ucrypt.AsymmetricKeys#rotate</div></summary>

<div markdown="1"> 
> > **Description:** Rotate the asymmetric keys by generating a new key pair and preserving the old one.
> 
> **Parameters:**
> None
> 
> **Returns:**  
> - `new_key_pair` ( *CryptoKeyPair* ): The newly generated key pair.
</div>
</details>

<br>

<details>
<summary><div class="apiref"> ucrypt.symmetric#generateKeyPair</div></summary>

<div markdown="1"> 
> > **Description:** Generate a symmetric key pair for encryption/decryption.
> 
> **Parameters:**
> None
> 
> **Returns:**  
> - `key_pair` ( *SymmetricKey* ): The generated symmetric key pair object for encryption/decryption.
</div>
</details>

<details>
<summary><div class="apiref"> ucrypt.SymmetricKey#encrypt</div></summary>

<div markdown="1"> 
> > **Description:** Encrypt data using symmetric encryption.
> 
> **Parameters:**
> - `file` ( *ArrayBuffer* ): The data to encrypt.
> - `key_override?` ( *string* ): Optional override for stored encryption key.
> - `options?` ( *Record<string, unknown>* ): Optional encryption options.
> 
> **Returns:**  
> - `encrypted_data` ( *Uint8Array* ): The resulting encrypted data.
</div>
</details>

<details>
<summary><div class="apiref"> ucrypt.SymmetricKey#decrypt</div></summary>

<div markdown="1"> 
> > **Description:** Decrypt data using symmetric decryption.
> 
> **Parameters:**
> - `file` ( *Uint8Array* ): The encrypted data to decrypt.
> - `key_override?` ( *string* ): Optional override for stored decryption key.
> - `options?` ( *Record<string, unknown>* ): Optional decryption options.
> 
> **Returns:**  
> - `decrypted_data` ( *ArrayBuffer* ): The resulting decrypted data.
</div>
</details>

<details>
<summary><div class="apiref"> ucrypt.SymmetricKey#rotate</div></summary>

<div markdown="1"> 
> > **Description:** Rotate the symmetric keys by generating a new key and preserving the old one.
> 
> **Parameters:**
> None
> 
> **Returns:**  
> - `new_key` ( *string* ): The newly generated key.
</div>
</details>

<br>

<details>
<summary><div class="apiref"> ucrypt.exchange#start_exchange</div></summary>

<div markdown="1"> 
> > **Description:** Start a Diffie-Hellman key exchange by generating public parameters and private key.
> 
> **Parameters:**
> None
> 
> **Returns:**  
> - `exchange_data` ( *[Payload, number]* ): Array containing public exchange data and private key.
</div>
</details>

<details>
<summary><div class="apiref"> ucrypt.exchange#finish_exchange</div></summary>

<div markdown="1"> 
> > **Description:** Complete a Diffie-Hellman key exchange by computing the shared secret.
> 
> **Parameters:**
> - `data` ( *Payload* ): The public exchange data from the other party.
> - `callback` ( *function* ): Callback function that receives the public value to send back.
> 
> **Returns:**  
> - `shared_secret` ( *number* ): The computed shared secret.
</div>
</details>

<br>

<details>
<summary><div class="apiref"> ucrypt#generateSecret</div></summary>

<div markdown="1"> 
> > **Description:** Generate a secure random secret of specified length.
> 
> **Parameters:**
> - `length` ( *number* ): The length of the secret to generate.
> 
> **Returns:**  
> - `secret` ( *string* ): The generated secret string.
</div>
</details>


## **Contributing**

---

> Please understand what is listed below somewhat :p

### **Technologies**


| **Purpose**      | **In-Use**         |
|:----------------:|:------------------:|
| Language         | TypeScript         |
| Runtime          | Bun                |
| Test platform    | Bun:test           |
| Version Control  | Git, Github        |
| Linting          | ESLint, Prettier   |

### **Functional Standards**

- All `src/class` Methods must return `Promise<ReturnType<T>>` or `ReturnType<T>`
- All `src/class`'s must accept a `ucrypt` instance

### **Current Feature Ideas**

- [x] **Exchange**
  - [x] Diffie–Hellman exchange
  - [ ] Group key Exchange
