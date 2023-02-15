import React, { useState } from 'react';

import { Button, Input, Typography } from 'antd';

import { keccak224Hash, keccak256Hash, keccak384Hash, keccak512Hash } from './keccak_app';

const { TextArea } = Input;
const { Title, Paragraph, Text, Link } = Typography;

const KeccakApp = () => {
  const [inputData, setInputData] = useState('');
  const [keccak224Result, setKeccak224Result] = useState('');
  const [keccak256Result, setKeccak256Result] = useState('');
  const [keccak384Result, setKeccak384Result] = useState('');

  const [keccak512Result, setKeccak512Result] = useState('');

  const clickGenerateHashButton = async () => {
    let result;
    result = await keccak224Hash(inputData);
    setKeccak224Result(result);

    result = await keccak256Hash(inputData);
    setKeccak256Result(result);

    result = await keccak384Hash(inputData);
    setKeccak384Result(result);

    result = await keccak512Hash(inputData);
    setKeccak512Result(result);
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
          Generate Keccak Hash
        </Button>
      </Paragraph>

      <Paragraph>
        <TextArea
          showCount
          placeholder="keccak224"
          value={keccak224Result}
          style={{ height: 120 }}
        />
      </Paragraph>
      <Paragraph>
        <TextArea
          showCount
          placeholder="keccak256"
          value={keccak256Result}
          style={{ height: 120 }}
        />
      </Paragraph>

      <Paragraph>
        <TextArea
          showCount
          placeholder="keccak384"
          value={keccak256Result}
          style={{ height: 120 }}
        />
      </Paragraph>

      <Paragraph>
        <TextArea
          showCount
          placeholder="keccak512"
          value={keccak512Result}
          style={{ height: 120 }}
        />
      </Paragraph>
    </div>
  );
};

export { KeccakApp };
