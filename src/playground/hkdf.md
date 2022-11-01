---
group:
  title: HKDF
  order: 0
order: 3
title: HKDF
---

# HKDF

```js

const GetAESGCMBytesKey = (raw_key, length, salt, info, hash) => {
    let salt_bytes = new Uint8Array();
    if (salt != "") {
        salt_bytes = new TextEncoder().encode(salt)
    }

    let info_bytes = new Uint8Array();
    if (info != "") {
        info_bytes = new TextEncoder().encode(info)
    }

    let master_key = await crypto.subtle.importKey('raw', raw_key, 'HKDF', false, ['deriveKey', 'deriveBits']);

    const dkey = await window.crypto.subtle.deriveKey(
        {
            name: 'HKDF', salt: salt_bytes, info: info_bytes, hash: hash
        },
        master_key,
        {name: 'AES-GCM', length: length},
        true,
        ['encrypt', 'decrypt']
    );
    var keyBytes = await crypto.subtle.exportKey('raw', dkey);

    return keyBytes;
}


let raw_key = await crypto.subtle.getRandomValues(new Uint8Array(128));

let key = await GetAESGCMBytesKey(raw_key, 256, "", "", "SHA-384");
console.log(key)
```
