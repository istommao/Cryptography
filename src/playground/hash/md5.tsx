import React, { useState } from 'react';

import { Button, Input, Typography } from 'antd';

const { TextArea } = Input;
const { Title, Paragraph, Text, Link } = Typography;

// @ts-ignore
import CryptoJS from 'crypto-js';

const MD5App = () => {
  const [inputData, setInputData] = useState('');
  const [md5Result, setMd5Result] = useState('');

  const clickGenerateMD5Button = () => {
    let result = CryptoJS.MD5(inputData).toString();
    setMd5Result(result);
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
        <Button type="primary" onClick={clickGenerateMD5Button}>
          Generate MD5
        </Button>
      </Paragraph>

      <Paragraph>
        <TextArea showCount value={md5Result} style={{ height: 120 }} />
      </Paragraph>
    </div>
  );
};

export { MD5App };
