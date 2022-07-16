import React, { useState } from 'react';

import { Button, Input } from 'antd';

const { TextArea } = Input;

import { GenerateEd25519KeyPair } from './key';

const Ed25519App = () => {
  const [pubkey, setPubkey] = useState('');
  const [privatekey, setPrivatekey] = useState('');

  const clickGenerateKeyButton = async () => {
    const result = await GenerateEd25519KeyPair();
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
      <Button type="primary" onClick={clickGenerateKeyButton}>
        Generate Ed25519 key pair
      </Button>

      {keyRenderData}
    </div>
  );
};

export default Ed25519App;
