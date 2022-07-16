import { Uint8ToString } from '../utils/base64';

const ByteArrayToHexString = (byteArray: Uint8Array) => {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};

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

  let b64encoded = '';
  if (exportType == 'base64') {
    b64encoded = Uint8ToString(byteKey);
  } else if (exportType == 'hex') {
    b64encoded = ByteArrayToHexString(byteKey);
  }

  return b64encoded;
};

export { GenerateAESKey };