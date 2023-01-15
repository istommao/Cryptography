import React, { useState } from 'react';

import { Button, Input, Typography } from 'antd';
const { Paragraph } = Typography;

const { TextArea } = Input;

import { GenerateEd25519KeyPair } from './key';

const Ed25519App = () => {
  const [pubkey, setPubkey] = useState('');
  const [privatekey, setPrivatekey] = useState('');

  const clickGenerateHexKeyButton = async () => {
    await clickGenerateKeyButton('hex');
  };

  const clickGenerateBase64KeyButton = async () => {
    await clickGenerateKeyButton('base64');
  };

  const clickGenerateKeyButton = async (exportType: string) => {
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
        <Paragraph>
          <TextArea showCount value={pubkey} style={{ height: 120 }} />
        </Paragraph>
        <h2>Privatekey: </h2>
        <Paragraph>
          <TextArea showCount value={privatekey} style={{ height: 120 }} />
        </Paragraph>
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

export { Ed25519App };
