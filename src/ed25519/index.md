---
nav:
  title: docs
  path: /docs
group:
  title: Crypto
  order: 0
order: 3
title: Ed25519
---

## Ed25519 Playground

```tsx
import React from 'react';
import { Ed25519App } from 'cryptography';

export default () => <Ed25519App />;
```

## Ed25519 Code Demo

```bash
yarn add @noble/ed25519
# or
npm install @noble/ed25519
```

```ts
// Common.js and ECMAScript Modules (ESM)
import * as ed from '@noble/ed25519';

const ByteArrayToHexString = (byteArray: Uint8Array) => {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};

const GenerateEd25519KeyPair = async () => {
  let privateObj = ed.utils.randomPrivateKey();

  let pubkeyObj = await ed.getPublicKey(privateObj);

  let PrivateKey = ByteArrayToHexString(privateObj);
  let PublicKey = ByteArrayToHexString(pubkeyObj);
  return {
    PrivateKey,
    PublicKey,
  };
};
```