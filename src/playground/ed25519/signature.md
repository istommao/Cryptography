---
group:
  title: ED25519
  order: 0
order: 3
title: Signature and verification
---

## Ed25519 Signature Playground

```tsx
import React from 'react';
import { Ed25519SignatureApp } from 'cryptography';

export default () => <Ed25519SignatureApp />;
```

## Ed25519 Signature Code Example

```ts
import * as ed from '@noble/ed25519';

declare type Hex = Uint8Array | string;

const Ed25519Sign = async (privateKey: Hex, message: Uint8Array) => {
  const signature = await ed.sign(message, privateKey);
  return signature;
};

const Ed25519Verify = async (pubKey: Hex, signature: Hex, message: Hex) => {
  const isValid = await ed.verify(signature, message, pubKey);
  return isValid;
};

const sigBytes = await Ed25519Sign(privatekey, new TextEncoder().encode('Hello'));

const isValid = await Ed25519Sign(pubKey, sigBytes, new TextEncoder().encode('Hello'));
```
