import React, { useState } from 'react';

import { Button, Input, Typography } from 'antd';

const { TextArea } = Input;
const { Title, Paragraph, Text, Link } = Typography;

import { ripemd160Hash } from './ripemd_app';

const RipemdApp = () => {
  const [inputData, setInputData] = useState('');
  const [ripemdResult, setRipemdResult] = useState('');

  const clickGenerateHashButton = async () => {
    let result = await ripemd160Hash(inputData);
    setRipemdResult(result);
  };

  return (
    <div>
      <Paragraph>
        <TextArea
          showCount
          placeholder="plain text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          style={{ height: 120 }}
        />
      </Paragraph>
      <Paragraph>
        <Button type="primary" onClick={clickGenerateHashButton}>
          Generate Ripemd160
        </Button>
      </Paragraph>

      <Paragraph>
        <TextArea showCount value={ripemdResult} style={{ height: 120 }} />
      </Paragraph>
    </div>
  );
};

export { RipemdApp };
