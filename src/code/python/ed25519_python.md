---
group:
  title: Python
  order: 0
order: 3
title: Ed25519
---

```bash
pip install cryptography
```

```python
import base64

from cryptography.exceptions import InvalidSignature
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ed25519


def generate_ed25519_key_pair(format_type=None):
    private_key_obj = ed25519.Ed25519PrivateKey.generate()
    pubkey_obj = private_key_obj.public_key()

    if not format_type:
        return private_key_obj, pubkey_obj

    private_bytes = private_key_obj.private_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PrivateFormat.Raw,
        encryption_algorithm=serialization.NoEncryption()
    )

    public_bytes = pubkey_obj.public_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PublicFormat.Raw
    )

    if format_type == "hex":
        return private_bytes.hex(), public_bytes.hex()
    elif format_type == "base64":
        private_key = base64.b64encode(private_bytes).decode()
        pubkey = base64.b64encode(public_bytes).decode()
        return private_key, pubkey
    elif format_type == "bytes":
        return private_bytes, public_bytes
    else:
        raise Exception("Invalid format type")

private_key, public_key = generate_ed25519_key_pair("hex")
```

`Or you can use cryptokit`

https://github.com/istommao/cryptokit

```bash
pip install cryptokit
```

```python
from cryptokit import ed25519

private_key, public_key = ed25519.generate_ed25519_key_pair("hex")

# base64 encode
private_key, public_key = ed25519.generate_ed25519_key_pair("base64")
```
