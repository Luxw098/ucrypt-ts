# ucrypt-ts
> A simple package for keeping your user's data secure.

## Tested Features
- **Hash Functions**
  - [ ] SHA-256
  - [ ] SHA-512
  - [ ] MD5
- **JSON Web Tokens (JWT)**
  - [ ] Token Signing
  - [ ] Token Verification
- **File Utility**
  - [ ] Encryption/Decryption
  - [ ] Compression/Decompression
- **RSA Utility**
  - [ ] Data Encryption/Decryption
  - [ ] Static Keys
  - [ ] Rotating Keys
  - [ ] Real-Time Key exchange (Diffie-Hellman over Websockets)


The package is structured to provide a modular and easy-to-use interface for working with these cryptographic features.



## Contributing
> Please understand all listed below to at least a basic degree.

| Component        | Technology         |
|:----------------:|:------------------:|
| Language         | TypeScript         |
| Runtime          | Bun                |
| Test platform    | Bun                |
| Version Control  | Git, Github        | 
| Extra            | ESLint, Prettier   |

### Code Standards
- All Utility Methods must return `ReturnType<S, M>`
- All Utility Classes must accept a `ucrypt` instance