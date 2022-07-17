import React, { useState } from 'react';

import { Button, Input, Radio, Typography } from 'antd';

import { GenerateAESKey } from './key';

const { Title, Paragraph, Text, Link } = Typography;

const { TextArea } = Input;

const AESApp = () => {
  const [AESKey, setAESKey] = useState('');

  const [keySize, setKeySize] = useState('256');
  const [AesName, setAesName] = useState('AES-GCM');

  const clickGenerateBase64KeyButton = async () => {
    const exportType = 'base64';
    await clickGenerateKeyButton(exportType);
  };

  const clickGenerateHexKeyButton = async () => {
    const exportType = 'hex';
    await clickGenerateKeyButton(exportType);
  };

  const clickGenerateKeyButton = async (exportType: string) => {
    const key = await GenerateAESKey(AesName, parseInt(keySize), exportType);
    setAESKey(key);
  };

  var keyRenderData;

  if (AESKey) {
    keyRenderData = (
      <div>
        <h2>Key: </h2>
        <Paragraph>
          <TextArea showCount value={AESKey} style={{ height: 120 }} />
        </Paragraph>
      </div>
    );
  } else {
    keyRenderData = '';
  }

  return (
    <div>
      <h2>Generate key pair</h2>
      <Paragraph>
        <Radio.Group value={AesName} onChange={(e) => setAesName(e.target.value)}>
          <Radio.Button value="AES-GCM" checked={true}>
            AES-GCM
          </Radio.Button>
          <Radio.Button value="AES-CTR">AES-CTR</Radio.Button>
          <Radio.Button value="AES-CBC">AES-CBC</Radio.Button>
        </Radio.Group>
      </Paragraph>
      <Paragraph>
        <Radio.Group value={keySize} onChange={(e) => setKeySize(e.target.value)}>
          <Radio.Button value="128">128</Radio.Button>
          <Radio.Button value="192">192</Radio.Button>
          <Radio.Button value="256" checked={true}>
            256
          </Radio.Button>
        </Radio.Group>
      </Paragraph>
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

export { AESApp };
