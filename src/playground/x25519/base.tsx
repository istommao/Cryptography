import React, { useState } from 'react';

import { Button, Input } from 'antd';

const { TextArea } = Input;

import { GenerateX25519KeyPair } from './key';

const X25519App = () => {
  const [pubkey, setPubkey] = useState('');
  const [privatekey, setPrivatekey] = useState('');

  const clickGenerateHexKeyButton = async () => {
    await clickGenerateKeyButton('hex');
  };

  const clickGenerateBase64KeyButton = async () => {
    await clickGenerateKeyButton('base64');
  };

  const clickGenerateKeyButton = async (exportType: string) => {
    const result = await GenerateX25519KeyPair(exportType);
    console.log(result);
    setPrivatekey(result.PrivateKey);
    setPubkey(result.PublicKey);
  };

  var keyRenderData;

  if (pubkey) {
    keyRenderData = (
      <div>
        <h2>Pubkey: </h2>
        <p>
          <TextArea showCount value={pubkey} style={{ height: 120 }} />
        </p>
        <h2>Privatekey: </h2>
        <p>
          <TextArea showCount value={privatekey} style={{ height: 120 }} />
        </p>
      </div>
    );
  } else {
    keyRenderData = '';
  }

  return (
    <div>
      <h2>Generate X25519 key</h2>
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

export { X25519App };
