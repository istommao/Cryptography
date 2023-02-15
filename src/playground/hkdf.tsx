import React, { useState } from 'react';

import { Button, Input, InputNumber } from 'antd';

const { TextArea } = Input;

import * as utils from '../utils/codec';

import * as hdkfPKG from '@noble/hashes/hkdf';
import { sha256 } from '@noble/hashes/sha256';

const fromHexString = (hexString: any) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte: string) => parseInt(byte, 16)));

const HKDFApp = () => {
  const [MasterSecret, setMasterSecret] = useState('');

  const [keyInfo, setKeyInfo] = useState('');
  const [keySalt, setKeySalt] = useState('');
  const [keySize, setKeySize] = useState(32);

  const [DerivedKeyHex, setDerivedKeyHex] = useState('');
  const [DerivedKeyBase64, setDerivedKeyBase64] = useState('');

  const clickGenerateKeyButton = async () => {
    let salt = keySalt;
    let info = keyInfo;
    let dkLen = keySize;

    const prk = hdkfPKG.extract(sha256, MasterSecret, salt);
    const hk2 = hdkfPKG.expand(sha256, prk, info, dkLen);

    setDerivedKeyHex(utils.ByteArrayToHexString(hk2));

    setDerivedKeyBase64(utils.Uint8ToBase64String(hk2));
  };

  const onChangeKeySize = (value: number) => {
    setKeySize(value);
  };

  return (
    <div style={{ overflow: 'auto' }}>
      <h2>HKDF</h2>
      <div style={{ height: '40px' }}>
        KeySize:{' '}
        <InputNumber
          size="large"
          min={1}
          defaultValue={keySize}
          placeholder="KeySize"
          onChange={onChangeKeySize}
        />
      </div>
      <div style={{ height: '30px', marginTop: '10px' }}>
        <TextArea
          showCount
          placeholder="Master Secret"
          value={MasterSecret}
          style={{ height: 60 }}
          onChange={(e) => setMasterSecret(e.target.value)}
        />
      </div>
      <div style={{ height: '30px', marginTop: '50px' }}>
        <TextArea
          showCount
          placeholder="Key salt"
          value={keySalt}
          style={{ height: 60 }}
          onChange={(e) => setKeySalt(e.target.value)}
        />
      </div>
      <div style={{ height: '30px' }}>
        <TextArea
          showCount
          value={keyInfo}
          placeholder="Key info"
          style={{ height: 60 }}
          onChange={(e) => setKeyInfo(e.target.value)}
        />
      </div>
      <div style={{ marginTop: '100px' }}>
        <Button type="primary" onClick={clickGenerateKeyButton}>
          Generate
        </Button>
      </div>
      &nbsp;&nbsp;
      <div style={{ height: '30px' }}>
        <TextArea showCount value={DerivedKeyHex} style={{ height: 60 }} />
      </div>
      <div style={{ height: '30px' }}>
        <TextArea showCount value={DerivedKeyBase64} style={{ height: 60 }} />
      </div>
    </div>
  );
};

export { HKDFApp };
