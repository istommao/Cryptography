const arrayBufferToString = (buf: any) => {
  let bytes = new Uint8Array(buf);
  return bytes.reduce((str, byte) => str + String.fromCharCode(byte), '');
};

const stringToArrayBuffer = (str: string) => {
  let buf = new ArrayBuffer(str.length);
  let bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

const GetRSAPEMData = (buffer: any) => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  let base64 = window.btoa(binary);
  let text = base64.replace(/[^\x00-\xff]/g, '$&\x01').replace(/.{64}\x01?/g, '$&\n');

  return text;
};

const GenerateRsaKeyPair = async (keySize: number, hashMethod: string) => {
  let algorithmOps = {
    name: 'RSA-OAEP',
    modulusLength: keySize,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: hashMethod,
  };

  const key = await window.crypto.subtle.generateKey(
    algorithmOps,
    true, //whether the key is extractable (i.e. can be used in exportKey)
    ['encrypt', 'decrypt'],
  );

  const prvKeyData = await window.crypto.subtle.exportKey('pkcs8', key.privateKey);
  const privateKey = GetRSAPEMData(prvKeyData);

  const pubKeyData = await window.crypto.subtle.exportKey('spki', key.publicKey);
  var publicKey = GetRSAPEMData(pubKeyData);

  return { privateKey, publicKey };
};

function base64ToBinary(str: string) {
  return atob(str);
}

const GetPubkeyObject = async (
  rsaPublicBase64String: string,
  keySize: number,
  hashMethod: string,
) => {
  let algorithmOptions = {
    name: 'RSA-OAEP',
    modulusLength: keySize,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: hashMethod,
  };

  const pubKey = await crypto.subtle.importKey(
    'spki',
    stringToArrayBuffer(base64ToBinary(rsaPublicBase64String)),
    algorithmOptions,
    false,
    ['encrypt'],
  );

  return pubKey;
};

const GetPrivatekeyObject = async (
  rsaPrivateBase64String: string,
  keySize: number,
  hashMethod: string,
) => {
  let algorithmOptions = {
    name: 'RSA-OAEP',
    modulusLength: keySize,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: hashMethod,
  };

  let privKey = await crypto.subtle.importKey(
    'pkcs8',
    stringToArrayBuffer(base64ToBinary(rsaPrivateBase64String)),
    algorithmOptions,
    false,
    ['decrypt'],
  );

  return privKey;
};

const getRsaDecryptData = async (
  privateKeStr: string,
  data: Uint8Array,
  keySize: number,
  hashMethod: string,
) => {
  let privateKeyObj = await GetPrivatekeyObject(privateKeStr, keySize, hashMethod);
  const algorithm = {
    name: 'RSA-OAEP',
  };

  const decryptedBuf = await window.crypto.subtle.decrypt(algorithm, privateKeyObj, data.buffer);

  return decryptedBuf;
};

const getRsaEncryptData = async (
  pubKeyStr: string,
  byteData: Uint8Array,
  keySize: number,
  hashMethod: string,
) => {
  let pubKeyObject = await GetPubkeyObject(pubKeyStr, keySize, hashMethod);

  let encryptedBuf = await crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    pubKeyObject,
    byteData,
  );

  return encryptedBuf;
};

export { GenerateRsaKeyPair, getRsaEncryptData, getRsaDecryptData };
