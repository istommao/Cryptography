---
group:
  title: PBKDF2
  order: 0
order: 3
title: PBKDF2
---

# PBKDF2

```js
const GetPBKDF2Key = (password) => {
  const enc = new TextEncoder();

  return window.crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, [
    'deriveBits',
    'deriveKey',
  ]);
};
```
