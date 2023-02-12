---
group:
  title: Secp
  order: 0
order: 3
title: Generate Secp256k1 key pair
---

## X25519 Playground

```tsx
import React from 'react';
import { Secp256k1App } from 'cryptography';

export default () => <Secp256k1App />;
```

### JavaScript CodeDemo

```bash
yarn add @noble/secp256k1
# or
npm install @noble/secp256k1
```

```ts
// Common.js and ECMAScript Modules (ESM)
import * as secp from '@noble/secp256k1';
// If you're using single file, use global variable instead: `window.nobleSecp256k1`

// Supports both async and sync methods, see docs
(async () => {
  // keys, messages & other inputs can be Uint8Arrays or hex strings
  // Uint8Array.from([0xde, 0xad, 0xbe, 0xef]) === 'deadbeef'
  const privKey = secp.utils.randomPrivateKey();
  const pubKey = secp.getPublicKey(privKey);
  const msgHash = await secp.utils.sha256('hello world');
  const signature = await secp.sign(msgHash, privKey);
  const isValid = secp.verify(signature, msgHash, pubKey);

  // Schnorr signatures
  const rpub = secp.schnorr.getPublicKey(privKey);
  const rsignature = await secp.schnorr.sign(message, privKey);
  const risValid = await secp.schnorr.verify(rsignature, message, rpub);
})();
```
