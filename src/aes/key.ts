import { ByteArrayToHexString, Uint8ToBase64String } from '../utils/codec';

const exportCryptoKey = async (key: CryptoKey) => {
  const exported = await window.crypto.subtle.exportKey('raw', key);
  const exportedKeyBuffer = new Uint8Array(exported);

  return exportedKeyBuffer;
};

const GenerateAESKey = async (AesName: string, keySize: number, exportType: string) => {
  let key = await window.crypto.subtle.generateKey(
    {
      name: AesName,
      length: keySize,
    },
    true,
    ['encrypt', 'decrypt'],
  );

  const byteKey = await exportCryptoKey(key);

  let encoded = '';
  if (exportType == 'base64') {
    encoded = Uint8ToBase64String(byteKey);
  } else if (exportType == 'hex') {
    encoded = ByteArrayToHexString(byteKey);
  }

  return encoded;
};

const importSecretKey = async (rawKey: any, aesName: string) => {
  return await window.crypto.subtle.importKey('raw', rawKey, aesName, true, ['encrypt', 'decrypt']);
};

const AesEncrypt = async (aesName: string, keyStr: any, keySize: number, iv: any, encoded: any) => {
  const alg = {
    name: aesName,
    iv: iv,
    length: keySize,
  };

  let key = await importSecretKey(keyStr, aesName);

  let result = await window.crypto.subtle.encrypt(alg, key, encoded);

  return result;
};

const AesDecrypt = async (aesName: string, keyStr: any, keySize: number, iv: any, encoded: any) => {
  const alg = {
    name: aesName,
    iv: iv,
    length: keySize,
  };

  let key = await importSecretKey(keyStr, aesName);

  let result = await window.crypto.subtle.decrypt(alg, key, encoded);

  return result;
};

export { GenerateAESKey, AesEncrypt, AesDecrypt };
