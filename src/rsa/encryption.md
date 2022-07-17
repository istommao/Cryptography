---
nav:
  title: docs
  path: /docs
group:
  title: RSA
title: Encryption and decryption
order: 2
---

## RSA Encryption Playground

```tsx
import React from 'react';
import { RsaEncryptionApp } from 'cryptography';

export default () => <RsaEncryptionApp />;
```

## RSA Encryption Code Example

```ts
const stringToArrayBuffer = (str: string) => {
  let buf = new ArrayBuffer(str.length);
  let bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

const Base64StringToUint8 = (base64: string) => {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
};

const Uint8ToBase64String = (u8a: any) => {
  return btoa(String.fromCharCode.apply(null, u8a));
};

function base64ToBinary(str: string) {
  return atob(str);
}

const GetPubkeyObject = async (
  rsaPublicBase64String: string,
  keySize: number,
  hashMethod: string,
) => {
  let algorithmOptions = {
    name: 'RSA-OAEP',
    modulusLength: keySize,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: hashMethod,
  };

  const pubKey = await crypto.subtle.importKey(
    'spki',
    stringToArrayBuffer(base64ToBinary(rsaPublicBase64String)),
    algorithmOptions,
    false,
    ['encrypt'],
  );

  return pubKey;
};

const GetPrivatekeyObject = async (
  rsaPrivateBase64String: string,
  keySize: number,
  hashMethod: string,
) => {
  let algorithmOptions = {
    name: 'RSA-OAEP',
    modulusLength: keySize,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: hashMethod,
  };

  let privKey = await crypto.subtle.importKey(
    'pkcs8',
    stringToArrayBuffer(base64ToBinary(rsaPrivateBase64String)),
    algorithmOptions,
    false,
    ['decrypt'],
  );

  return privKey;
};

const getRsaDecryptData = async (
  privateKeStr: string,
  data: Uint8Array,
  keySize: number,
  hashMethod: string,
) => {
  let privateKeyObj = await GetPrivatekeyObject(privateKeStr, keySize, hashMethod);
  const algorithm = {
    name: 'RSA-OAEP',
  };

  const decryptedBuf = await window.crypto.subtle.decrypt(algorithm, privateKeyObj, data.buffer);

  return decryptedBuf;
};

const getRsaEncryptData = async (
  pubKeyStr: string,
  byteData: Uint8Array,
  keySize: number,
  hashMethod: string,
) => {
  let pubKeyObject = await GetPubkeyObject(pubKeyStr, keySize, hashMethod);

  let encryptedBuf = await crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    pubKeyObject,
    byteData,
  );

  return encryptedBuf;
};
```

### Encryption

```ts
let plainText = 'hello RSA';

let result = await getRsaEncryptData(
  pubkey,
  new TextEncoder().encode(plainText),
  parseInt(keySize),
  hashMethod,
);

const b64str = Uint8ToBase64String(new Uint8Array(result));
```

### Decryption

```ts
let byteData = Base64StringToUint8(encryptData);

try {
  let result = await getRsaDecryptData(privatekey, byteData, parseInt(keySize), hashMethod);

  let plainText = new TextDecoder().decode(result);
} catch (error) {
  console.error('Decrypt error: ' + error);
}
```
