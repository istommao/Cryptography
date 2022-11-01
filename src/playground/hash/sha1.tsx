import React, { useState } from 'react';

import { Button, Input, Typography } from 'antd';

const { TextArea } = Input;
const { Title, Paragraph, Text, Link } = Typography;

// @ts-ignore
import CryptoJS from 'crypto-js';

const SHA1App = () => {
  const [inputData, setInputData] = useState('');
  const [sha1Result, setSHA1Result] = useState('');

  const clickGenerateSHA1Button = () => {
    let result = CryptoJS.SHA1(inputData).toString();
    setSHA1Result(result);
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
        <Button type="primary" onClick={clickGenerateSHA1Button}>
          Generate SHA1
        </Button>
      </Paragraph>

      <Paragraph>
        <TextArea showCount value={sha1Result} style={{ height: 120 }} />
      </Paragraph>
    </div>
  );
};

export { SHA1App };
