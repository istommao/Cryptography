---
nav:
  title: code
  path: /code
group:
  title: AES python
  order: 0
order: 3
title: AES python
---

# AES python

```bash
pip install cryptography
```

```python
import base64

from cryptography.hazmat.primitives import padding
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend


class AESCrypto(object):
    """AESCrypto."""

    def __init__(self, aes_key, aes_iv):
        if not isinstance(aes_key, bytes):
            aes_key = aes_key.encode()

        if not isinstance(aes_iv, bytes):
            aes_iv = aes_iv.encode()

        self.aes_key = aes_key
        self.aes_iv = aes_iv


    def gcm_encrypt(self, data):
        encryptor = Cipher(
            algorithms.AES(self.aes_key),
            modes.GCM(self.aes_iv),
            backend=default_backend()
        ).encryptor()

        # associated_data will be authenticated but not encrypted,
        # it must also be passed in on decryption.
        # encryptor.authenticate_additional_data(associated_data)

        if isinstance(data, str):
            data = data.encode("utf-8")

        ciphertext = encryptor.update(data) + encryptor.finalize()

        result = ciphertext + encryptor.tag
        return result

    def gcm_decrypt(self, bytes_data):
        tag = bytes_data[-16:]
        ciphertext = bytes_data[:-16]

        decryptor = Cipher(
            algorithms.AES(self.aes_key),
            modes.GCM(self.aes_iv, tag),
            backend=default_backend()
        ).decryptor()

        # We put associated_data back in or the tag will fail to verify
        # when we finalize the decryptor.
        # decryptor.authenticate_additional_data(associated_data)

        result = decryptor.update(ciphertext) + decryptor.finalize()

        return result.decode("utf-8")



aes = AESCrypto(key, iv)
byte_data = aes.gcm_encrypt("hello".encode("utf-8"))

text = aes.gcm_decrypt(byte_data)
```
