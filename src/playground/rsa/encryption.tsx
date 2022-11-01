import React, { useEffect, useState } from 'react';

import { Button, Input, Radio, Typography, message } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

import { GenerateRsaKeyPair, getRsaEncryptData, getRsaDecryptData } from './key';
import { Base64StringToUint8, Uint8ToBase64String } from '../../utils/codec';

const { TextArea } = Input;

const RsaEncryptionApp = () => {
  const [pubkey, setPubkey] = useState('');
  const [privatekey, setPrivatekey] = useState('');

  const [plainText, setPlainText] = useState('');
  const [encryptData, setEncryptData] = useState('');

  const [keySize, setKeySize] = useState<string>('2048');
  const [hashMethod, setHashMethod] = useState<string>('SHA-256');

  const clickGenerateRsaButton = async () => {
    const result = await GenerateRsaKeyPair(parseInt(keySize), hashMethod);

    setPrivatekey(result.privateKey);
    setPubkey(result.publicKey);
  };

  useEffect(() => {
    if (!pubkey) {
      clickGenerateRsaButton();
    }
  });

  const clickRsaEncryptButton = async () => {
    let result = await getRsaEncryptData(
      pubkey,
      new TextEncoder().encode(plainText),
      parseInt(keySize),
      hashMethod,
    );

    const b64str = Uint8ToBase64String(new Uint8Array(result));
    setEncryptData(b64str);
  };

  const clickRsaDecryptButton = async () => {
    let byteData = Base64StringToUint8(encryptData);
    try {
      let result = await getRsaDecryptData(privatekey, byteData, parseInt(keySize), hashMethod);

      let plainText = new TextDecoder().decode(result);
      setPlainText(plainText);
    } catch (error) {
      message.error('Decrypt error: ' + error);
    }
  };
  return (
    <div>
      <Paragraph>
        <Radio.Group value={keySize} onChange={(e) => setKeySize(e.target.value)}>
          <Radio.Button value="1024">1024</Radio.Button>
          <Radio.Button value="2048" checked={true}>
            2048
          </Radio.Button>
          <Radio.Button value="4096">4096</Radio.Button>
        </Radio.Group>
      </Paragraph>
      <Radio.Group value={hashMethod} onChange={(e) => setHashMethod(e.target.value)}>
        <Radio.Button value="SHA-256" checked={true}>
          SHA-256
        </Radio.Button>
        <Radio.Button value="SHA-384">SHA-384</Radio.Button>
        <Radio.Button value="SHA-512">SHA-512</Radio.Button>
      </Radio.Group>
      &nbsp;&nbsp;
      <Button type="primary" onClick={clickGenerateRsaButton}>
        Generate key pair
      </Button>
      <div>
        <Text>PublicKey:</Text>
        <Paragraph>
          <TextArea showCount value={pubkey} />
        </Paragraph>

        <Text>Privatekey:</Text>
        <Paragraph>
          <TextArea showCount value={privatekey} />
        </Paragraph>
      </div>
      <div>
        <Paragraph>
          <TextArea
            showCount
            value={plainText}
            placeholder="Plain Text"
            onChange={(e) => {
              setPlainText(e.target.value);
            }}
          />
        </Paragraph>

        <Paragraph>
          <Button type="primary" onClick={clickRsaEncryptButton}>
            Encrypt
          </Button>
          &nbsp;&nbsp;
          <Button type="primary" onClick={clickRsaDecryptButton}>
            Decrypt
          </Button>
        </Paragraph>

        <Paragraph>
          <TextArea showCount value={encryptData} placeholder="Encrypt Data" />
        </Paragraph>
      </div>
    </div>
  );
};

export { RsaEncryptionApp };
