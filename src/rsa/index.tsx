import React, { useState } from 'react';

import { Button, Input, Radio } from 'antd';

import { GenerateRsaKeyPair } from './key';

const { TextArea } = Input;

const App = () => {
  const [pubkey, setPubkey] = useState('');
  const [privatekey, setPrivatekey] = useState('');

  const [keySize, setKeySize] = useState<string>('2048');
  const [hashMethod, setHashMethod] = useState<string>('SHA-256');

  const clickGenerateRsaButton = async () => {
    const result = await GenerateRsaKeyPair(parseInt(keySize), hashMethod);
    console.log(result);
    setPrivatekey(result.privateKey);
    setPubkey(result.publicKey);
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
          <TextArea showCount value={privatekey} style={{ height: 320 }} />
        </p>
      </div>
    );
  } else {
    keyRenderData = '';
  }

  return (
    <div>
      <p>
        <Radio.Group value={keySize} onChange={(e) => setKeySize(e.target.value)}>
          <Radio.Button value="1024">1024</Radio.Button>
          <Radio.Button value="2048" checked={true}>
            2048
          </Radio.Button>
          <Radio.Button value="4096">4096</Radio.Button>
        </Radio.Group>
      </p>
      <Radio.Group value={hashMethod} onChange={(e) => setHashMethod(e.target.value)}>
        <Radio.Button value="SHA-256" checked={true}>
          SHA-256
        </Radio.Button>
        <Radio.Button value="SHA-384">SHA-384</Radio.Button>
        <Radio.Button value="SHA-512">SHA-512</Radio.Button>
      </Radio.Group>
      &nbsp;&nbsp;
      <Button type="primary" onClick={clickGenerateRsaButton}>
        Generate key pair
      </Button>
      {keyRenderData}
    </div>
  );
};

export default App;
