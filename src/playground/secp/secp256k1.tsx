import React, { useState } from 'react';

import { Button, Input } from 'antd';

const { TextArea } = Input;

import { GenerateSecp256k1KeyPair, GetAddressFromPubkey } from './key';
import Paragraph from 'antd/lib/typography/Paragraph';

const Secp256k1App = () => {
  const [pubkey, setPubkey] = useState('');
  const [privatekey, setPrivatekey] = useState('');
  const [address, setAddress] = useState('');

  const clickGenerateHexKeyButton = async () => {
    await clickGenerateKeyButton('hex');
  };

  const clickGenerateBase64KeyButton = async () => {
    await clickGenerateKeyButton('base64');
  };

  const clickGenerateKeyButton = async (exportType: string) => {
    const result = await GenerateSecp256k1KeyPair(exportType);
    console.log(result);
    setPrivatekey(result.PrivateKey);
    setPubkey(result.PublicKey);

    let ethAddress = await GetAddressFromPubkey(result.PublicKey);
    setAddress(ethAddress);
  };

  var keyRenderData;

  if (pubkey) {
    keyRenderData = (
      <div>
        <h2>Address: </h2>
        <Paragraph>
          <TextArea showCount value={address} style={{ height: 120 }} />
        </Paragraph>
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
      <h2>Generate Secp256k1 key</h2>
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

export { Secp256k1App };
