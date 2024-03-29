import React, { useEffect, useState } from 'react';

import { Button, Input, Typography, message, Radio } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

const { TextArea } = Input;

import {
  GenerateEd25519KeyPair,
  Ed25519Sign,
  ByteArrayToHexString,
  HexStringToUint8Array,
  Ed25519Verify,
} from './key';
import {
  Base64StringToUint8,
  Base64ToHex,
  HexToBase64,
  Uint8ToBase64String,
} from '../../utils/codec';

const loadKeyFromString = (_key: string) => {
  if (_key.length == 64) {
    return _key;
  } else {
    return Base64ToHex(_key);
  }
};

const Ed25519SignatureApp = () => {
  const [outputFormat, setOutputFormat] = useState('base64');

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

  // useEffect(() => {
  //   if (!pubkey) {
  //     clickGenerateHexKeyButton();
  //   }
  // });

  const clickSigningButton = async () => {
    let sigeBytes;
    try {
      let _private_key = loadKeyFromString(privatekey);
      sigeBytes = await Ed25519Sign(_private_key, new TextEncoder().encode(originalText));
    } catch {
      message.error('Invalid Private Key');
      return;
    }

    let signatureStr =
      outputFormat == 'base64' ? Uint8ToBase64String(sigeBytes) : ByteArrayToHexString(sigeBytes);
    setSignature(signatureStr);
  };

  const changeOutputFormat = (format: string) => {
    if (outputFormat === format) {
      return;
    }

    if (outputFormat === 'base64') {
      setSignature(Base64ToHex(signature));
    } else {
      setSignature(HexToBase64(signature));
    }

    setOutputFormat(format);
  };

  const clickVerifyButton = async () => {
    let isValid;

    let signBytes =
      outputFormat === 'base64' ? Base64StringToUint8(signature) : HexStringToUint8Array(signature);

    let _pub_key = loadKeyFromString(pubkey);
    if (signBytes.length != 64) {
      message.error('Invalid signature');
      return;
    }

    try {
      isValid = await Ed25519Verify(_pub_key, signBytes, new TextEncoder().encode(originalText));
    } catch (e) {
      console.log(e);
      message.error('Invalid PublicKey');
      return;
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
        <TextArea
          showCount
          value={pubkey}
          onChange={(e) => {
            setPubkey(e.target.value);
          }}
        />
        <Text>Privatekey:</Text>
        <TextArea
          showCount
          onChange={(e) => {
            setPrivatekey(e.target.value);
          }}
          value={privatekey}
        />
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
        &nbsp;&nbsp;
        <div style={{ display: 'inline-block', 'margin-left': '30px' }}>
          Format:&nbsp;
          <Radio.Group defaultValue={outputFormat} buttonStyle="solid">
            <Radio.Button value="base64" onClick={() => changeOutputFormat('base64')}>
              Base64
            </Radio.Button>
            <Radio.Button value="hex" onClick={() => changeOutputFormat('hex')}>
              HEX
            </Radio.Button>
          </Radio.Group>
        </div>
      </Paragraph>

      <Paragraph>
        <TextArea
          showCount
          placeholder="Signature"
          value={signature}
          onChange={(e) => {
            setSignature(e.target.value);
          }}
        ></TextArea>
      </Paragraph>
    </div>
  );
};

export { Ed25519SignatureApp };
