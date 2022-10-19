import React, { useState } from 'react';

import { Button, Input } from 'antd';

const { TextArea } = Input;

import { GenerateEd25519KeyPair, GetShareKeyResult } from './key';

const Ed25519ShareKeyApp = () => {
  const [shareKey, setShareKey] = useState('');

  const [pubkeyA, setPubkeyA] = useState('');
  const [privatekeyA, setPrivatekeyA] = useState('');

  const [pubkeyB, setPubkeyB] = useState('');
  const [privatekeyB, setPrivatekeyB] = useState('');

  const clickGenerateHexKeyButton = async () => {
    await clickGenerateKeyButton('hex');
  };

  const clickGetShareKeyButton = async () => {
    console.log(privatekeyB); // privatekeyB is empty
    let _keyA = await GetShareKeyResult(privatekeyB, pubkeyA);
    let _keyB = await GetShareKeyResult(privatekeyA, pubkeyB);
    // alert(_keyA === _keyB);
    setShareKey(_keyA);
  };

  const clickGenerateBase64KeyButton = async () => {
    await clickGenerateKeyButton('base64');
  };

  const clickGenerateKeyButton = async (exportType: string) => {
    let resultA = await GenerateEd25519KeyPair(exportType);
    console.log(resultA);

    setPrivatekeyA(resultA.PrivateKey);
    setPubkeyA(resultA.PublicKey);

    let resultB = await GenerateEd25519KeyPair(exportType);
    console.log(resultB);
    setPrivatekeyB(resultB.PrivateKey);
    setPubkeyB(resultB.PublicKey);
  };

  var keyRenderData;

  if (pubkeyA) {
    keyRenderData = (
      <div>
        <h2>PubkeyA: </h2>
        <p>
          <TextArea showCount value={pubkeyA} style={{ height: 20 }} />
        </p>
        <h2>PrivatekeyA: </h2>
        <p>
          <TextArea showCount value={privatekeyA} style={{ height: 20 }} />
        </p>
        <div style={{ height: '20px' }}></div>
        <h2>PubkeyB: </h2>
        <p>
          <TextArea showCount value={pubkeyB} style={{ height: 20 }} />
        </p>
        <h2>PrivatekeyB: </h2>
        <p>
          <TextArea showCount value={privatekeyB} style={{ height: 20 }} />
        </p>
        <div style={{ height: '20px' }}></div>
        <Button type="primary" onClick={clickGetShareKeyButton}>
          Get ShareKey
        </Button>
        <h2>ShareKey: </h2>
        <p>
          <TextArea showCount value={shareKey} style={{ height: 20 }} />
        </p>
      </div>
    );
  } else {
    keyRenderData = '';
  }

  return (
    <div>
      <h2>Generate Two Ed25519 key pairs</h2>
      <Button type="primary" onClick={clickGenerateHexKeyButton}>
        Generate hex encode
      </Button>
      &nbsp;&nbsp;
      <Button type="primary" onClick={clickGenerateBase64KeyButton}>
        Generate base64 encode
      </Button>
      {keyRenderData}
    </div>
  );
};

export { Ed25519ShareKeyApp };
