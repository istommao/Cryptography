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

const GetShareKeyResult = async (privateKeyA, pubKeyB) => {
  const shared = await ed.getSharedSecret(privateKeyA, pubKeyB);
  return ByteArrayToHexString(shared);
};

const SharedKeyTest = async (privateKeyA, pubkeyA, privateKeyB, pubKeyB) => {
  // const pub = ed.curve25519.scalarMultBase(privateKey);
  const sharedA = await ed.getSharedSecret(privateKeyA, pubKeyB);

  const sharedB = await ed.getSharedSecret(privateKeyB, pubkeyA);
  console.log(ByteArrayToHexString(sharedA));
  console.log(ByteArrayToHexString(sharedB));
};

export {
  GetShareKeyResult,
  SharedKeyTest,
  GenerateEd25519KeyPair,
  Ed25519Sign,
  Ed25519Verify,
  ByteArrayToHexString,
  HexStringToUint8Array,
};
