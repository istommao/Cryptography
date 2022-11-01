import React, { useEffect, useState } from 'react';

import { Button, Input, Radio, Typography } from 'antd';

import { AesDecrypt, AesEncrypt, GenerateAESKey } from './key';
import { ByteArrayToHexString, HexStringToUint8Array } from '../ed25519/key';

import { aesGCMEncrypt, aesGCMDecrypt } from './testkey';

const { Title, Paragraph, Text, Link } = Typography;

const { TextArea } = Input;

import { Uint8ToBase64String, Base64StringToUint8 } from '../../utils/codec';

const AesEncryptionApp = () => {
  const [AesIVHex, setAesIVHex] = useState('');

  const [plainText, setPlainText] = useState('');
  const [encodeData, setEncodeData] = useState('');

  const [AESKey, setAESKey] = useState('');

  const [keySize, setKeySize] = useState('256');
  const [AesName, setAesName] = useState('AES-GCM');

  const clickGenerateBase64KeyButton = async () => {
    const exportType = 'base64';
    await clickGenerateKeyButton(exportType);

    UpdateHexIV();

    // // test
    // let inputData = new TextEncoder().encode("hello")
    // let key = Base64StringToUint8("Sv5ZTZ1dXfP5RlFkBwuph+vUASGLoNwERwt4CIn8Qps=")
    // let iv = Base64StringToUint8("Sv5ZTZ1dXfP5RlFk")
    // let byteData = await AesEncrypt("AES-GCM", key, 256, iv, inputData);

    let bytex = Base64StringToUint8(
      'B+cKT7G0zVZYzTAwIkCB5pRljRGkLJMJdiTreCFinEFmFO2tuBjCyoe727C8AsfItwMfuULr2CrzY21hHeYcafdomXcR5jhLJeNvnf9MIuCeEv7CWyCpEfj+OL+nbuzoZK5t3R/n2ZH2/Od1awXKORw9/8gzKiKFwTJM7iHi+1uNVCXi5TPfIB/fQ+0OFrXYxerex7L5WkuF+gG4cJ2SapQqbPOfz+qla258IckTfbm9f6dll4TNR+bXurxyD/U=',
    );

    let de = await aesGCMDecrypt(
      'KW9Ni2erBboTKeDg05PdkIYJLIpGlLErVeNP9XrRhcc=',
      'KW9Ni2erBboTKeDg',
      bytex,
    );
    console.log('===', JSON.parse(new TextDecoder().decode(new Uint8Array(de))));

    // let key = Base64StringToUint8("KW9Ni2erBboTKeDg05PdkIYJLIpGlLErVeNP9XrRhcc=")
    // let iv = Base64StringToUint8("KW9Ni2erBboTKeDg")

    // let inputData = bytex

    // let result2 = await AesEncrypt("AES-GCM", key, 256, iv, new Uint8Array(de));
    // console.log("result2", Uint8ToBase64String(new Uint8Array(result2)))

    // console.log("de===: ", JSON.parse(new TextDecoder().decode(de)))

    // let result = Uint8ToBase64String(new Uint8Array(byteData));
    // console.log("result:", result)

    // // let decode_data = await aesGCMDecrypt(key, iv, Base64StringToUint8(base64_str))
    // // let plain_text = new TextDecoder().decode(decode_data)
    // // console.log(plain_text)

    // let de = await aesGCMDecrypt("Sv5ZTZ1dXfP5RlFkBwuph+vUASGLoNwERwt4CIn8Qps=", "Sv5ZTZ1dXfP5RlFk", new Uint8Array(byteData))
    // console.log("de: ", new TextDecoder().decode(de))

    // let result2 = await  aesGCMEncrypt("Sv5ZTZ1dXfP5RlFkBwuph+vUASGLoNwERwt4CIn8Qps=", "Sv5ZTZ1dXfP5RlFk", inputData);
    // console.log("result2:", Uint8ToBase64String(new Uint8Array(result2)))
    // console.log("result2:", btoa(new Uint8Array(result2)))
  };

  const clickGenerateHexKeyButton = async () => {
    const exportType = 'hex';
    await clickGenerateKeyButton(exportType);

    UpdateHexIV();
  };

  const generateAesIVHex = (keySize: number) => {
    const iv = crypto.getRandomValues(new Uint8Array(keySize));
    const ivHex = Array.from(iv)
      .map((b) => ('00' + b.toString(keySize)).slice(-2))
      .join(''); // iv as hex string
    return ivHex;
  };

  const UpdateHexIV = () => {
    let keySize;

    if (AesName == 'AES-CBC') {
      keySize = 16;
    } else if (AesName == 'AES-GCM') {
      keySize = 12;
    } else if (AesName == 'AES-CTR') {
      keySize = 16;
    }

    if (keySize) {
      let ivHex = generateAesIVHex(keySize);

      setAesIVHex(ivHex);
    }
  };

  useEffect(() => {
    if (!AESKey) {
      clickGenerateHexKeyButton();
    }
  });

  const clickGenerateKeyButton = async (exportType: string) => {
    const key = await GenerateAESKey(AesName, parseInt(keySize), exportType);
    setAESKey(key);
  };

  const clickAesEncryptButton = async () => {
    let inputData = new TextEncoder().encode(plainText);
    let key = HexStringToUint8Array(AESKey);

    let iv = HexStringToUint8Array(AesIVHex);
    let byteData = await AesEncrypt(AesName, key, parseInt(keySize), iv, inputData);
    // let result = ByteArrayToHexString(new Uint8Array(byteData));

    let result = Uint8ToBase64String(new Uint8Array(byteData));

    setEncodeData(result);
  };

  const clickAesDecryptButton = async () => {
    let inputData = HexStringToUint8Array(encodeData);
    let key = HexStringToUint8Array(AESKey);

    let iv = HexStringToUint8Array(AesIVHex);
    let byteData = await AesDecrypt(AesName, key, parseInt(keySize), iv, inputData);

    let text = new TextDecoder().decode(byteData);
    setPlainText(text);
  };

  return (
    <div>
      <Paragraph>
        <Text>Key:</Text>
        <TextArea showCount value={AESKey} />
        <Text>IV:</Text>
        <TextArea showCount value={AesIVHex} />
      </Paragraph>
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
      <Paragraph>
        <Button type="primary" onClick={clickGenerateHexKeyButton}>
          hex encode
        </Button>
        &nbsp;&nbsp;
        <Button type="primary" onClick={clickGenerateBase64KeyButton}>
          base64 encode
        </Button>
      </Paragraph>
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
        <Button type="primary" onClick={clickAesEncryptButton}>
          Encrypt
        </Button>
        &nbsp;&nbsp;
        <Button type="primary" onClick={clickAesDecryptButton}>
          decrypt
        </Button>
      </Paragraph>
      <Paragraph>
        <TextArea showCount value={encodeData} placeholder="encode data" />
      </Paragraph>
    </div>
  );
};

export { AesEncryptionApp };
