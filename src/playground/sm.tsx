import React, { useState } from 'react';

import { Button, Input } from 'antd';

const { TextArea } = Input;

const { SM2, SM3, SM4 } = require('gm-crypto');

const SM4App = () => {
  // SM4
  // Block Cipher Algorithm.

  const key = '0123456789abcdeffedcba9876543210'; // Any string of 32 hexadecimal digits
  const originalData = 'SM4 国标对称加密';

  /**
   * Block cipher modes:
   * - ECB: electronic codebook
   * - CBC: cipher block chaining
   */

  let encryptedData, decryptedData;

  // ECB
  encryptedData = SM4.encrypt(originalData, key, {
    inputEncoding: 'utf8',
    outputEncoding: 'base64',
  });
  decryptedData = SM4.decrypt(encryptedData, key, {
    inputEncoding: 'base64',
    outputEncoding: 'utf8',
  });

  // CBC
  const iv = '0123456789abcdeffedcba9876543210'; // Initialization vector(any string of 32 hexadecimal digits)
  encryptedData = SM4.encrypt(originalData, key, {
    iv,
    mode: SM2.constants.CBC,
    inputEncoding: 'utf8',
    outputEncoding: 'hex',
  });

  decryptedData = SM4.decrypt(encryptedData, key, {
    iv,
    mode: SM2.constants.CBC,
    inputEncoding: 'hex',
    outputEncoding: 'utf8',
  });

  const clickActionButton = async () => {};

  return (
    <div>
      <h2>SM4</h2>
      <Button type="primary" onClick={clickActionButton}>
        Generate
      </Button>
    </div>
  );
};

const SM3App = () => {
  const [SM3Payload, setSM3Payload] = useState('');

  const [SM3HashHexResult, setSM3HashHexResult] = useState('');
  const [SM3HashBase64Result, setSM3HashBase64Result] = useState('');

  function buf2hex(buffer) {
    // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0')).join('');
  }

  const clickGenerateKeyButton = async () => {
    // Cryptographic Hash Algorithm.
    var buffer = SM3.digest(SM3Payload);
    var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));

    // console.log(SM3.digest(SM3Payload, 'base64'))
    setSM3HashBase64Result(base64String);

    setSM3HashHexResult(buf2hex(buffer));
  };

  return (
    <div>
      <h2>SM3 Cryptographic Hash Algorithm.</h2>
      <Button type="primary" onClick={clickGenerateKeyButton}>
        Hash
      </Button>
      <div style={{ height: '30px', marginTop: '12px' }}>
        <TextArea
          showCount
          placeholder="payload"
          value={SM3Payload}
          style={{ height: 20 }}
          onChange={(e) => setSM3Payload(e.target.value)}
        />
      </div>
      <div style={{ height: '30px', marginTop: '12px' }}>
        <TextArea
          showCount
          placeholder="Base64 hash"
          value={SM3HashBase64Result}
          style={{ height: 20 }}
        />
      </div>
      <div style={{ height: '30px', marginTop: '12px' }}>
        <TextArea
          showCount
          placeholder="Hex hash"
          value={SM3HashHexResult}
          style={{ height: 20 }}
        />
      </div>
    </div>
  );
};

const SM2App = () => {
  const [SM2PrivateKey, setSM2PrivateKey] = useState('');
  const [SM2PubKey, setSM2PubKey] = useState('');

  const [SM2Payload, setSM2Payload] = useState('');
  const [SM2CryptoData, setSM2CryptoData] = useState('');

  const [SM2DecryptData, setSM2DecryptData] = useState('');

  const clickDecryptButton = async () => {
    if (!SM2PrivateKey) {
      return;
    }

    const decryptedData = SM2.decrypt(SM2CryptoData, SM2PrivateKey, {
      inputEncoding: 'base64',
      outputEncoding: 'utf8',
    });

    setSM2DecryptData(decryptedData);
  };

  const clickEncryptButton = async () => {
    if (!SM2PubKey) {
      return;
    }

    let encryptedData = SM2.encrypt(SM2Payload, SM2PubKey, {
      inputEncoding: 'utf8',
      outputEncoding: 'base64',
    });

    setSM2CryptoData(encryptedData);
  };

  const clickGenerateKeyButton = async () => {
    const { publicKey, privateKey } = SM2.generateKeyPair();

    setSM2PrivateKey(privateKey);
    setSM2PubKey(publicKey);
  };

  return (
    <div style={{ border: '1px solid red;', overflow: 'auto' }}>
      <h2>Generate SM2 key</h2>

      <Button type="primary" onClick={clickGenerateKeyButton}>
        Generate
      </Button>

      <div style={{ height: '30px', marginTop: '12px' }}>
        <TextArea
          showCount
          placeholder="PrivateKey"
          value={SM2PrivateKey}
          style={{ height: 20 }}
          onChange={(e) => setSM2PrivateKey(e.target.value)}
        />
      </div>
      <div style={{ height: '30px', marginTop: '12px' }}>
        <TextArea
          showCount
          placeholder="Pubkey"
          value={SM2PubKey}
          style={{ height: 60 }}
          onChange={(e) => setSM2PubKey(e.target.value)}
        />
      </div>

      <div style={{ height: '30px', marginTop: '12px' }}>
        <TextArea
          showCount
          placeholder="payload"
          value={SM2Payload}
          style={{ height: 20 }}
          onChange={(e) => setSM2Payload(e.target.value)}
        />
      </div>

      <div style={{ height: '30px', marginTop: '60px' }}>
        <Button type="primary" onClick={clickEncryptButton}>
          Encrypt
        </Button>
      </div>

      <div style={{ height: '30px', marginTop: '12px' }}>
        <TextArea showCount placeholder="CryptoData" value={SM2CryptoData} style={{ height: 60 }} />
      </div>
      <div style={{ height: '30px', marginTop: '60px' }}>
        <Button type="primary" onClick={clickDecryptButton}>
          Decrypt
        </Button>
      </div>

      <div style={{ height: '30px', marginTop: '12px' }}>
        <TextArea
          showCount
          placeholder="Decrypt Data"
          value={SM2DecryptData}
          style={{ height: 60 }}
        />
      </div>
    </div>
  );
};

export { SM2App, SM3App, SM4App };
