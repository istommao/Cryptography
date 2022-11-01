---
group:
  title: ChaCha20
  order: 0
order: 3
title: ChaCha20
---

# ChaCha20

```bash
yarn add js-chacha20
```

## Encrypt message

```js
import JSChaCha20 from "js-chacha20";

const key = Uint8Array([...]); // 32 bytes key
const nonce = Uint8Array([...]); // 12 bytes nonce
const message = Uint8Array([...]); // some data as bytes array

// Encrypt //
const encrypt = new JSChaCha20(key, nonce).encrypt(message);

// now encrypt contains bytes array of encrypted message
```

## Decrypt message

```js
import JSChaCha20 from "js-chacha20";

const key = Uint8Array([...]); // 32 bytes key
const nonce = Uint8Array([...]); // 12 bytes nonce
const encrypt = Uint8Array([...]); // some data as bytes array

// Encrypt //
const message = new JSChaCha20(key, nonce).decrypt(encrypt);

// now message contains bytes array of original message
```
