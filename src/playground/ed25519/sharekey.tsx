import React, { useState } from 'react';

import { Button, Input } from 'antd';
import { Base64ToHex } from '../../utils/codec';

const { TextArea } = Input;

import { GenerateEd25519KeyPair, GetShareKeyResult, SharedKeyTest, GetAESBase64Key } from './key';

const Ed25519ShareKeyApp = () => {
  const [keyFormat, setKeyFormat] = useState('hex');
  const [shareKey, setShareKey] = useState('');
  const [pubkeyA, setPubkeyA] = useState('');
  const [privatekeyA, setPrivatekeyA] = useState('');

  const [pubkeyB, setPubkeyB] = useState('');
  const [privatekeyB, setPrivatekeyB] = useState('');

  const clickGetShareKeyButton = async (format: any) => {
    let PrivateB = privatekeyB;
    let PubA = pubkeyA;
    let PrivateA = privatekeyA;
    let PubB = pubkeyB;

    // console.log(keyFormat)

    if (keyFormat === 'base64') {
      PrivateA = Base64ToHex(PrivateA);
      PrivateB = Base64ToHex(PrivateB);
      PubA = Base64ToHex(PubA);
      PubB = Base64ToHex(PubB);
    }

    let _keyA = await GetShareKeyResult(PrivateB, PubA, format);
    let _keyB = await GetShareKeyResult(PrivateA, PubB, format);

    setShareKey(_keyA);
  };

  const clickGenerateKeyButton = async (exportType: string) => {
    setKeyFormat(exportType);

    let resultA = await GenerateEd25519KeyPair(exportType);
    // console.log(resultA);

    setPrivatekeyA(resultA.PrivateKey);
    setPubkeyA(resultA.PublicKey);

    let resultB = await GenerateEd25519KeyPair(exportType);
    // console.log(resultB);
    setPrivatekeyB(resultB.PrivateKey);
    setPubkeyB(resultB.PublicKey);
  };

  var keyRenderData;

  keyRenderData = (
    <div>
      <h2>PubkeyA: </h2>
      <div style={{ height: '30px' }}>
        <TextArea
          showCount
          value={pubkeyA}
          style={{ height: 20 }}
          onChange={(e) => setPubkeyA(e.target.value)}
        />
      </div>
      <h2>PrivatekeyA: </h2>
      <div style={{ height: '30px' }}>
        <TextArea
          showCount
          value={privatekeyA}
          style={{ height: 20 }}
          onChange={(e) => setPrivatekeyA(e.target.value)}
        />
      </div>
      <h2>PubkeyB: </h2>
      <div style={{ height: '30px' }}>
        <TextArea
          showCount
          value={pubkeyB}
          style={{ height: 20 }}
          onChange={(e) => setPubkeyB(e.target.value)}
        />
      </div>
      <h2>PrivatekeyB: </h2>
      <div>
        <TextArea
          showCount
          value={privatekeyB}
          style={{ height: 20 }}
          onChange={(e) => setPrivatekeyB(e.target.value)}
        />
      </div>
      <div style={{ height: '30px' }}></div>
      <div style={{ height: '30px' }}>
        <Button type="primary" onClick={() => clickGetShareKeyButton('hex')}>
          Get ShareKey Hex Format
        </Button>
        &nbsp;&nbsp;
        <Button type="primary" onClick={() => clickGetShareKeyButton('base64')}>
          Get ShareKey Base64 Format
        </Button>
      </div>
      <h2>ShareKey: </h2>
      <div>
        <TextArea showCount value={shareKey} style={{ height: 20 }} />
      </div>
    </div>
  );

  return (
    <div>
      <h2>Generate Two Ed25519 key pairs</h2>
      <Button type="primary" onClick={() => clickGenerateKeyButton('hex')}>
        Generate hex encode
      </Button>
      &nbsp;&nbsp;
      <Button type="primary" onClick={() => clickGenerateKeyButton('base64')}>
        Generate base64 encode
      </Button>
      {keyRenderData}
    </div>
  );
};

export { Ed25519ShareKeyApp };
