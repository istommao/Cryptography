---
group:
  title: X25519
  order: 0
order: 3
title: Share key
---

## X25519 Playground

```tsx
import React from 'react';
import { X25519ShareKeyApp } from 'cryptography';

export default () => <X25519ShareKeyApp />;
```

### JavaScript CodeDemo

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

const GenerateX25519KeyPair = async (exportType: string) => {
  let privateObj = ed.utils.randomPrivateKey();

  let pubkeyObj = ed.curve25519.scalarMultBase(privateObj);

  let PrivateKey = '',
    PublicKey = '';

  if (exportType == 'base64') {
    PrivateKey = Uint8ToBase64String(privateObj);
    PublicKey = Uint8ToBase64String(pubkeyObj);
  } else if ((exportType = 'hex')) {
    // PrivateKey = ByteArrayToHexString(privateObj);
    PrivateKey = ed.utils.bytesToHex(privateObj);
    PublicKey = ed.utils.bytesToHex(pubkeyObj);
  }

  return {
    PrivateKey,
    PublicKey,
  };
};
```
