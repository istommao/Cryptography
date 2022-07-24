import React, { useState } from 'react';

import { Button, Input, Typography } from 'antd';

const { TextArea } = Input;
const { Title, Paragraph, Text, Link } = Typography;

// @ts-ignore
import * as sha3 from 'js-sha3';

const SHA3App = () => {
  const [inputData, setInputData] = useState('');
  const [sha224Result, setSha224Result] = useState('');
  const [sha256Result, setSha256Result] = useState('');
  const [sha384Result, setSha384Result] = useState('');
  const [sha512Result, setSha512Result] = useState('');

  const clickGenerateSHA3Button = () => {
    let result224 = sha3.sha3_224(inputData).toString();
    setSha224Result(result224);

    let result256 = sha3.sha3_256(inputData).toString();
    setSha256Result(result256);

    let result384 = sha3.sha3_384(inputData).toString();
    setSha384Result(result384);

    let sha512Result = sha3.sha3_512(inputData).toString();
    setSha512Result(sha512Result);
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
        <Button type="primary" onClick={clickGenerateSHA3Button}>
          Generate SHA3
        </Button>
      </Paragraph>

      <Paragraph>
        <TextArea showCount placeholder="SHA224" value={sha224Result} style={{ height: 120 }} />
      </Paragraph>

      <Paragraph>
        <TextArea showCount placeholder="SHA256" value={sha256Result} style={{ height: 120 }} />
      </Paragraph>

      <Paragraph>
        <TextArea showCount placeholder="SHA384" value={sha384Result} style={{ height: 120 }} />
      </Paragraph>

      <Paragraph>
        <TextArea showCount placeholder="SHA512" value={sha512Result} style={{ height: 120 }} />
      </Paragraph>
    </div>
  );
};

export { SHA3App };
