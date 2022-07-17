// Common.js and ECMAScript Modules (ESM)
import * as ed from '@noble/ed25519';
import { Uint8ToString } from '../utils/base64';

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
    PrivateKey = Uint8ToString(privateObj);
    PublicKey = Uint8ToString(pubkeyObj);
  } else if ((exportType = 'hex')) {
    PrivateKey = ByteArrayToHexString(privateObj);
    PublicKey = ByteArrayToHexString(pubkeyObj);
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

export {
  GenerateEd25519KeyPair,
  Ed25519Sign,
  Ed25519Verify,
  ByteArrayToHexString,
  HexStringToUint8Array,
};
