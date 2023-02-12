import React, { useState } from 'react';

import { Button, Input } from 'antd';

const { TextArea } = Input;

import hkdf from 'js-crypto-hkdf'; // for npm

import * as utils from '../utils/codec';

const fromHexString = (hexString: any) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte: string) => parseInt(byte, 16)));

const HKDFApp = () => {
  const [MasterSecret, setMasterSecret] = useState('');
  const [DerivedKey, setDerivedKey] = useState('');
  const [DerivedKeyHex, setDerivedKeyHex] = useState('');
  const [DerivedKeyBase64, setDerivedKeyBase64] = useState('');

  const clickGenerateKeyButton = async () => {
    // const masterSecret = ...; // Uint8Array of arbitrary length

    const hash = 'SHA-256';

    const length = 32; // derived key length
    const info = ''; // information specified in rfc5869

    // let derivedKey = await hkdf.compute(MasterSecret, hash, length, info);

    hkdf.compute(fromHexString('68656c6c6f'), hash, length, info).then((derivedKey) => {
      // now you get a automatically-generated salt and a key derived from the masterSecret.

      // console.log(derivedKey.key);

      setDerivedKeyHex(utils.ByteArrayToHexString(derivedKey.key));

      setDerivedKeyBase64(utils.Uint8ToBase64String(derivedKey.key));
    });
  };

  return (
    <div style={{ overflow: 'auto' }}>
      <h2>HKDF</h2>
      <div style={{ height: '30px' }}>
        <TextArea
          showCount
          placeholder="Master Secret"
          value={MasterSecret}
          style={{ height: 60 }}
          onChange={(e) => setMasterSecret(e.target.value)}
        />
      </div>
      <div style={{ marginTop: '50px' }}>
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
