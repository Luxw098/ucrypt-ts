# ucrypt-ts

> A simple cryptographic library for secure data handling.

## Tested Features

- **Hash Functions**
  - [x] Digest (Supports most algorthims)
- **JSON Web Tokens (JWT)**
  - [x] Token Signing
  - [x] Token Verification
- **File Utilities**
  - [x] Encryption/Decryption
  - [x] Compression/Decompression
- **MFA Implementation**
  - [x] Secrets
  - [x] TOTP Generation
  - [x] TOTP Validation  
- **RSA Tools**
  - [x] Data Encryption/Decryption
  - [x] Static Keys
  - [x] Rotating Keys
  - [ ] Real-Time Key exchange (Diffie-Hellman over Websockets)

The package is structured to provide a modular and easy-to-use interface for working with these cryptographic features.

## Contributing

> Please understand all listed below to at least a basic degree.

| Component        | Technology         |
|:----------------:|:------------------:|
| Language         | TypeScript         |
| Runtime          | Bun                |
| Test platform    | Bun:test           |
| Version Control  | Git, Github        |
| Extra            | ESLint, Prettier   |

### Code Standards

- All `src/class` Methods must return `Promise<ReturnType<T>>` or `ReturnType<T>`
- All `src/class`'s must accept a `ucrypt` instance
