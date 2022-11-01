---
group:
  title: RSA
title: Generate key pair
order: 2
---

## RSA Playground

```tsx
import React from 'react';
import { RsaApp } from 'cryptography';

export default () => <RsaApp />;
```

## RSA Code Demo

```ts
const GetRSAPEMData = (buffer: any) => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  let base64 = window.btoa(binary);
  let text = base64.replace(/[^\x00-\xff]/g, '$&\x01').replace(/.{64}\x01?/g, '$&\n');

  return text;
};

const GenerateRsaKeyPair = async () => {
  let algorithmOps = {
    name: 'RSA-OAEP',
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: 'SHA-512',
  };

  const key = await window.crypto.subtle.generateKey(
    algorithmOps,
    true, //whether the key is extractable (i.e. can be used in exportKey)
    ['encrypt', 'decrypt'],
  );

  const prvKeyData = await window.crypto.subtle.exportKey('pkcs8', key.privateKey);
  const privateKey = GetRSAPEMData(prvKeyData);

  const pubKeyData = await window.crypto.subtle.exportKey('spki', key.publicKey);
  var publicKey = GetRSAPEMData(pubKeyData);

  return { privateKey, publicKey };
};
```
