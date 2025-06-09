---

---


## **Overview**

- **Hashing** - Secure data hashing with various algorithms
- **File Handling** - Encryption, decryption, compression, and decompression
- **Json Web Tokens** - Token signing and verification
- **MFA** - TOTP-Based code generation and validation,
- **RSA** - Key generation, encryption/decryption, and key rotation
- **AES** - Secret exchange, encryption/decryption, and secret rotation

<br>
## **Installation**

```shell
# Using bun
bun add ucrypt-ts

# Using npm
npm install ucrypt-ts
```

<br>
## **Getting Started**

```ts
// Typescript 
import ucrypt from 'ucrypt-ts';

const crypt = new ucrypt({
    // Your client configuration
});
```

### **Examples**

---

> Hashing implementation

```ts
const known_hash = "1d08c598430d2d8d98fa3d3f49e8dca331daa818958d8bf0dbfa2aa384d8a7fd";
const hash = (await crypto.hash.digest("sensitive data")).data as string;
console.log("HASH Valid:", known_hash === hash);
```


> JWT Token Generation and Verification

```ts
const jwt_secret = crypto.generateSecret(16).data as string;
const jwt_token = (await crypto.jwt.sign({ userId: 123 }, jwt_secret)).data as string;
const jwt_valid = await crypto.jwt.verify(jwt_token, jwt_secret);
console.log("JWT Valid:", jwt_valid);
```


> 2FA Code Generation and Verification

```ts
const mfa_secret = crypto.generateSecret(16).data as string;
const mfa_code = (await crypto.mfa.generateTOTP(mfa_secret)).data as string;
const mfa_valid = await crypto.mfa.verifyTOTP(mfa_code, mfa_secret);
console.log("2FA Valid:", jwt_valid);
```

<br>
## **API Reference**

<details>
<summary><div class="apiref"> ucrypt.hash#digest</div></summary>

<div markdown="1"> 
> <br>
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
> <br>
> **Description:** Encrypt a file's data.
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
> <br>
> **Description:** Decrypt a file's data.
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
> <br>
> **Description:** Compress a file's data.
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
> <br>
> **Description:** Decompress a file's data.
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
> <br>
> **Description:** Sign data to create a JWT token.
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

<br>

<div markdown="1"> 
> <br>
> **Description:** Verify a JWT token's signature.
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
> <br>
> **Description:** Generate a TOTP (Time-based One-Time Password) code.
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
> <br>
> **Description:** Verify a TOTP code against a secret.
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
<summary><div class="apiref"> ucrypt.rsa#generateKeyPair</div></summary>

<div markdown="1"> 
> <br>
> **Description:** Generate an RSA key pair for encryption/decryption.
> 
> **Parameters:**
> - `extractable` ( *boolean* ): Whether the key is extractable.
> - `usages` ( *KeyUsage[]* ): Array of allowed key usages.
> - `gen_params_override?` ( *Partial<RsaHashedKeyGenParams | EcKeyGenParams>* ): Override for key generation parameters.
> 
> **Returns:**  
> - `key_pair` ( *rsa_key* ): The generated RSA key pair.
</div>
</details>

<details>
<summary><div class="apiref"> ucrypt.rsa_key#encrypt</div></summary>

<div markdown="1"> 
> <br>
> **Description:** Encrypt data using RSA public key.
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
<summary><div class="apiref"> ucrypt.rsa_key#decrypt</div></summary>

<div markdown="1"> 
> <br>
> **Description:** Decrypt data using RSA private key.
> 
> **Parameters:**
> - `data` ( *string* ): The encrypted data to decrypt.
> - `privateKey?` ( *CryptoKey* ): Overide for stored private key.
> 
> **Returns:**  
> - `decrypted_data` ( *string* ): The resulting decrypted data.
</div>
</details>

<details>
<summary><div class="apiref"> ucrypt.rsa_key#rotate</div></summary>

<div markdown="1"> 
> <br>
> **Description:** Rotate the RSA keys by generating a new key pair and preserving the old one.
> 
> **Parameters:**
> None
> 
> **Returns:**  
> None - Updates the internal key pairs.
</div>
</details>




<br>
## **Contributing**

> Please understand what is listed below somewhat :p

### **Technologies**


| **Purpose**      | **In-Use**         |
|:----------------:|:------------------:|
| Language         | TypeScript         |
| Runtime          | Bun                |
| Test platform    | Bun:test           |
| Version Control  | Git, Github        |
| Extra            | ESLint, Prettier   |

### **Functional Standards**

- All `src/class` Methods must return `Promise<ReturnType<T>>` or `ReturnType<T>`
- All `src/class`'s must accept a `ucrypt` instance

### **Current Feature Ideas**

- [ ] ・**RSA**
> - [ ] ・Key exchange
> - [x] ・Encryption/Decryption
> - [x] ・Default options
> - [x] ・Static key
> - [x] ・Rotating key

- [ ] ・**AES**
> - [ ] ・Secret exchange
> - [x] ・Encrypt/Decrypt
> - [x] ・Default options
> - [x] ・Static secret
> - [x] ・Rotating secret