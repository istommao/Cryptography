import React, { useState } from 'react';

import { Button, Modal } from 'antd';

import { GenerateRsaKeyPair } from './key';

const App = () => {
  const [pubkey, setPubkey] = useState('');
  const [privatekey, setPrivatekey] = useState('');

  const clickGenerateRsaButton = async () => {
    const result = await GenerateRsaKeyPair();
    console.log(result);
    setPrivatekey(result.privateKey);
    setPubkey(result.publicKey);
  };

  var keyRenderData;

  if (pubkey) {
    keyRenderData = (
      <div>
        <h2>Pubkey: </h2>
        <p>{pubkey}</p>
        <h2>Privatekey: </h2>
        <p>{privatekey}</p>
      </div>
    );
  } else {
    keyRenderData = '';
  }

  return (
    <div>
      <Button type="primary" onClick={clickGenerateRsaButton}>
        Generate RSA key pair
      </Button>

      {keyRenderData}
    </div>
  );
};

export default App;
