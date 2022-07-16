import React, { useState } from 'react';

import { Button, Input, Radio } from 'antd';

import { GenerateAESKey } from './key';

const { TextArea } = Input;

const AESApp = () => {
  const [AESKey, setAESKey] = useState('');

  const [keySize, setKeySize] = useState('256');
  const [AesName, setAesName] = useState('AES-GCM');

  const [exportType, setExportType] = useState('base64');

  const clickGenerateBase64KeyButton = async () => {
    setExportType('base64');
    await clickGenerateKeyButton();
  };

  const clickGenerateHexKeyButton = async () => {
    setExportType('hex');
    await clickGenerateKeyButton();
  };

  const clickGenerateKeyButton = async () => {
    const key = await GenerateAESKey(AesName, parseInt(keySize), exportType);
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
      <h2>Generate key pair</h2>
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
      <Button type="primary" onClick={clickGenerateHexKeyButton}>
        hex encode
      </Button>
      &nbsp;&nbsp;
      <Button type="primary" onClick={clickGenerateBase64KeyButton}>
        base64 encode
      </Button>
      {keyRenderData}
    </div>
  );
};

export default AESApp;
