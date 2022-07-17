import React, { useEffect, useState } from 'react';

import { Button, Input, Typography, message } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

const { TextArea } = Input;

import {
  GenerateEd25519KeyPair,
  Ed25519Sign,
  ByteArrayToHexString,
  HexStringToUint8Array,
  Ed25519Verify,
} from './key';

const Ed25519SignatureApp = () => {
  const [originalText, setOriginalText] = useState('');
  const [signature, setSignature] = useState('');

  const [pubkey, setPubkey] = useState('');
  const [privatekey, setPrivatekey] = useState('');

  const clickGenerateHexKeyButton = async () => {
    await clickGenerateKeyButton('hex');
  };

  //   const clickGenerateBase64KeyButton = async () => {
  //     await clickGenerateKeyButton('base64');
  //   };

  const clickGenerateKeyButton = async (exportType: string) => {
    const result = await GenerateEd25519KeyPair(exportType);

    setPrivatekey(result.PrivateKey);
    setPubkey(result.PublicKey);
  };

  useEffect(() => {
    if (!pubkey) {
      clickGenerateHexKeyButton();
    }
  });

  const clickSigningButton = async () => {
    const sigStr = await Ed25519Sign(privatekey, new TextEncoder().encode(originalText));

    setSignature(ByteArrayToHexString(sigStr));
  };

  const clickVerifyButton = async () => {
    let isValid;
    try {
      isValid = await Ed25519Verify(
        pubkey,
        HexStringToUint8Array(signature),
        new TextEncoder().encode(originalText),
      );
    } catch {
      isValid = false;
    }

    if (isValid) {
      message.success('Verify successfully');
    } else {
      message.error('Invalid signature');
    }
  };

  return (
    <div>
      <Paragraph>
        <Button type="primary" onClick={clickGenerateHexKeyButton}>
          Generate hex encode
        </Button>
      </Paragraph>

      <Paragraph>
        <Text>PublicKey:</Text>
        <TextArea showCount value={pubkey} />
        <Text>Privatekey:</Text>
        <TextArea showCount value={privatekey} />
      </Paragraph>
      <Paragraph>
        <TextArea
          showCount
          placeholder="Original Text"
          value={originalText}
          onChange={(e) => {
            setOriginalText(e.target.value);
          }}
        ></TextArea>
      </Paragraph>

      <Paragraph>
        <Button type="primary" onClick={clickSigningButton}>
          Signing Data
        </Button>
        &nbsp;&nbsp;
        <Button type="primary" onClick={clickVerifyButton}>
          Verify signature
        </Button>
      </Paragraph>

      <Paragraph>
        <TextArea showCount placeholder="Signature" value={signature}></TextArea>
      </Paragraph>
    </div>
  );
};

export { Ed25519SignatureApp };
