// Common.js and ECMAScript Modules (ESM)
import * as ed from '@noble/ed25519';
import { Uint8ToBase64String } from '../utils/codec';

const HexStringToUint8Array = (hexString: string) => {
  if (hexString.length % 2 !== 0) {
    throw 'Invalid hexString';
  }

  var arrayBuffer = new Uint8Array(hexString.length / 2);

  for (var i = 0; i < hexString.length; i += 2) {
    var byteValue = parseInt(hexString.substr(i, 2), 16);
    if (isNaN(byteValue)) {
      throw 'Invalid hexString';
    }
    arrayBuffer[i / 2] = byteValue;
  }

  return arrayBuffer;
};

const ByteArrayToHexString = (byteArray: Uint8Array) => {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};

const GenerateEd25519KeyPair = async (exportType: string) => {
  let privateObj = ed.utils.randomPrivateKey();

  let pubkeyObj = await ed.getPublicKey(privateObj);

  let PrivateKey = '',
    PublicKey = '';

  if (exportType == 'base64') {
    PrivateKey = Uint8ToBase64String(privateObj);
    PublicKey = Uint8ToBase64String(pubkeyObj);
  } else if ((exportType = 'hex')) {
    // PrivateKey = ByteArrayToHexString(privateObj);
    PrivateKey = ed.utils.bytesToHex(privateObj);
    PublicKey = ed.utils.bytesToHex(pubkeyObj);
  }

  return {
    PrivateKey,
    PublicKey,
  };
};

declare type Hex = Uint8Array | string;

const Ed25519Sign = async (privateKey: Hex, message: Uint8Array) => {
  const signature = await ed.sign(message, privateKey);
  return signature;
};

const Ed25519Verify = async (pubKey: Hex, signature: Hex, message: Hex) => {
  const isValid = await ed.verify(signature, message, pubKey);
  return isValid;
};

const GetShareKeyResult = async (privateKeyA: any, pubKeyB: any, format: string) => {
  try {
    const shared = await ed.getSharedSecret(privateKeyA, pubKeyB);
    if (format === 'hex') {
      return ByteArrayToHexString(shared);
    } else {
      return Uint8ToBase64String(shared);
    }
  } catch (e: any) {
    return e.toString();
  }
};

const SharedKeyTest = async (privateKeyA: any, pubkeyA: any, privateKeyB: any, pubKeyB: any) => {
  // const pub = ed.curve25519.scalarMultBase(privateKey);
  const sharedA = await ed.getSharedSecret(privateKeyA, pubKeyB);

  const sharedB = await ed.getSharedSecret(privateKeyB, pubkeyA);
  // console.log(ByteArrayToHexString(sharedA));
  // console.log(ByteArrayToHexString(sharedB));

  return ByteArrayToHexString(sharedA);
};

// const fromHexString = (hexString) => Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

// // Convert a hex string to a byte array
function fromHexString(hex: any) {
  for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

// // Convert a byte array to a hex string
// function bytesToHex(bytes) {
//     for (var hex = [], i = 0; i < bytes.length; i++) {
//         var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
//         hex.push((current >>> 4).toString(16));
//         hex.push((current & 0xF).toString(16));
//     }
//     return hex.join("");
// }

const GetAESBase64Key = async (hex_key: string) => {
  let master_key = await crypto.subtle.importKey(
    'raw',
    // @ts-ignore
    fromHexString(hex_key),
    'HKDF',
    false,
    ['deriveKey'],
  );

  let aes_key_obj = await window.crypto.subtle.deriveKey(
    { name: 'HKDF', salt: new Uint8Array(), info: new Uint8Array(), hash: 'SHA-384' },
    master_key,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );

  let arrayBuffer = await crypto.subtle.exportKey('raw', aes_key_obj);
  const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  console.log('base64String', base64String);

  return base64String;
};

export {
  GetAESBase64Key,
  GetShareKeyResult,
  SharedKeyTest,
  GenerateEd25519KeyPair,
  Ed25519Sign,
  Ed25519Verify,
  ByteArrayToHexString,
  HexStringToUint8Array,
};
