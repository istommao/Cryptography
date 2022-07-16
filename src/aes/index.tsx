import React, { useState } from 'react';

import { Button, Input, Radio } from 'antd';

import { GenerateAESKey } from './key';

const { TextArea } = Input;

const AESApp = () => {
  const [AESKey, setAESKey] = useState('');

  const [keySize, setKeySize] = useState('256');
  const [AesName, setAesName] = useState('AES-GCM');

  const clickGenerateKeyButton = async () => {
    const key = await GenerateAESKey(AesName, parseInt(keySize));
    setAESKey(key);
  };

  var keyRenderData;

  if (AESKey) {
    keyRenderData = (
      <div>
        <h2>Key: </h2>
        <p>
          <TextArea showCount value={AESKey} style={{ height: 120 }} />
        </p>
      </div>
    );
  } else {
    keyRenderData = '';
  }

  return (
    <div>
      <p>
        <Radio.Group value={AesName} onChange={(e) => setAesName(e.target.value)}>
          <Radio.Button value="AES-GCM" checked={true}>
            AES-GCM
          </Radio.Button>
          <Radio.Button value="AES-CTR">AES-CTR</Radio.Button>
          <Radio.Button value="AES-CBC">AES-CBC</Radio.Button>
        </Radio.Group>
      </p>
      <p>
        <Radio.Group value={keySize} onChange={(e) => setKeySize(e.target.value)}>
          <Radio.Button value="128">128</Radio.Button>
          <Radio.Button value="256" checked={true}>
            256
          </Radio.Button>
        </Radio.Group>
      </p>
      <Button type="primary" onClick={clickGenerateKeyButton}>
        Generate key pair
      </Button>

      {keyRenderData}
    </div>
  );
};

export default AESApp;
