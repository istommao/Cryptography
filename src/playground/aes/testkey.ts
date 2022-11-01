import { sha3_224 } from 'js-sha3';
import * as ed from '@noble/ed25519';

const getEd25519SharedKey = async (myEd25519PrivateKey: string, targetUserPubkey: string) => {
  const sharedKey = await ed.getSharedSecret(myEd25519PrivateKey, targetUserPubkey);

  return sharedKey;
};

const urlsafe2arr = (b64: string) => {
  b64 = b64.replace(/_/g, '/').replace(/-/g, '+');
  b64 += '==='.slice((b64.length + 3) % 4);
  var b = atob(b64)
    .split('')
    .map((s) => s.charCodeAt(0));
  return new Uint8Array(b);
};

const importKeyB64 = async (b64: string) => {
  return await crypto.subtle.importKey('raw', urlsafe2arr(b64), 'HKDF', false, ['deriveKey']);
};

const hexToBase64 = (hexstring: any) => {
  return btoa(
    hexstring
      .match(/\w{2}/g)
      .map((a: string) => {
        return String.fromCharCode(parseInt(a, 16));
      })
      .join(''),
  );
};

const arr2b64 = (arr: ArrayBuffer) => {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(arr) as any));
};

const makeAesGCMEncKey = async (key: CryptoKey, info: string) => {
  const opt = {
    name: 'HKDF',
    salt: new Uint8Array(),
    info: new TextEncoder().encode(info),
    hash: 'SHA-256',
  };
  const dkey = await window.crypto.subtle.deriveKey(
    opt,
    key,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );
  var keyBytes = await crypto.subtle.exportKey('raw', dkey);
  return arr2b64(keyBytes);
};

const stringToArrayBuffer = (str: string) => {
  let buf = new ArrayBuffer(str.length);
  let bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

const importSecretKey = async (rawKey: any, aesName: string) => {
  return await window.crypto.subtle.importKey('raw', rawKey, aesName, true, ['encrypt', 'decrypt']);
};

const fromHexString = (hexString: any) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte: string) => parseInt(byte, 16)));

const Base64StringToUint8 = (base64: string) => {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }

  return bytes;
};

const ByteArrayToHexString = (byteArray: Uint8Array) => {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};

export const GetAESBase64Key = async (hex_key: string) => {
  let master_key = await crypto.subtle.importKey('raw', fromHexString(hex_key), 'HKDF', false, [
    'deriveKey',
  ]);

  let aes_key_obj = await window.crypto.subtle.deriveKey(
    { name: 'HKDF', salt: new Uint8Array(), info: new Uint8Array(), hash: 'SHA-384' },
    master_key,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );

  let arrayBuffer = await crypto.subtle.exportKey('raw', aes_key_obj);
  const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

  return base64String;
};

export const getMessageSharedSecret = async (
  myEd25519PrivateKey: string,
  targetUserPubkey: string,
  msg_timestamp: string,
) => {
  const sharedKey = await getEd25519SharedKey(myEd25519PrivateKey, targetUserPubkey);
  const hashKey = sha3_224(sharedKey + msg_timestamp);
  const masterKey = await importKeyB64(hexToBase64(hashKey));
  const aesKey = await makeAesGCMEncKey(masterKey, msg_timestamp.toString());
  return aesKey;
};

const aesEncrypt = async (
  aesName: string,
  keyStr: string,
  keySize: number,
  iv: string,
  encoded: Uint8Array,
) => {
  const alg = {
    name: aesName,
    iv: stringToArrayBuffer(atob(iv)),
    length: keySize,
  };
  let key = await importSecretKey(stringToArrayBuffer(atob(keyStr)), aesName);
  let result = await window.crypto.subtle.encrypt(alg, key, encoded);
  return result;
};

export const aesGCMEncrypt = async (keyStr: string, iv: string, inputByteData: Uint8Array) => {
  const keySize = 256;
  return await aesEncrypt('AES-GCM', keyStr, keySize, iv, inputByteData);
};

const aesDecrypt = async (
  aesName: string,
  keyStr: string,
  keySize: number,
  iv: string,
  encoded: Uint8Array,
) => {
  const alg = {
    name: aesName,
    // iv: stringToArrayBuffer(atob(iv)),
    iv: Base64StringToUint8(iv),
    length: keySize,
  };

  // let key = await importSecretKey(stringToArrayBuffer(atob(keyStr)), aesName);
  let key = await importSecretKey(Base64StringToUint8(keyStr), aesName);

  let result = await window.crypto.subtle.decrypt(alg, key, encoded);

  return result;
};

export const aesGCMDecrypt = async (keyStr: string, iv: string, encoded: Uint8Array) => {
  const keySize = 256;
  return await aesDecrypt('AES-GCM', keyStr, keySize, iv, encoded);
};

export const getShareKey = async (privateKey: string, pubKey: string) => {
  const shared = await ed.getSharedSecret(privateKey, pubKey);
  return ByteArrayToHexString(shared);
};
