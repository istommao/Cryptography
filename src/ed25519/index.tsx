import React, { useState } from 'react';

import { Button, Input } from 'antd';

const { TextArea } = Input;

import { GenerateEd25519KeyPair } from './key';

const Ed25519App = () => {
  const [pubkey, setPubkey] = useState('');
  const [privatekey, setPrivatekey] = useState('');
  const [exportType, setExportType] = useState('base64');

  const clickGenerateHexKeyButton = async () => {
    setExportType('hex');
    await clickGenerateKeyButton();
  };

  const clickGenerateBase64KeyButton = async () => {
    setExportType('base64');
    await clickGenerateKeyButton();
  };

  const clickGenerateKeyButton = async () => {
    const result = await GenerateEd25519KeyPair(exportType);
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
      <h2>Generate Ed25519 key</h2>
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

export default Ed25519App;
