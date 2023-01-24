// Common.js and ECMAScript Modules (ESM)
import * as ed from '@noble/ed25519';
import { Uint8ToBase64String } from '../../utils/codec';

const GetShareKeyResult = async (privateKeyA: any, pubKeyB: any, format: string) => {
  try {
    const shared = await ed.curve25519.scalarMult(privateKeyA, pubKeyB);
    if (format === 'hex') {
      return ByteArrayToHexString(shared);
    } else {
      return Uint8ToBase64String(shared);
    }
  } catch (e: any) {
    return e.toString();
  }
};

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

const GenerateX25519KeyPair = async (exportType: string) => {
  let privateObj = ed.utils.randomPrivateKey();

  let pubkeyObj = ed.curve25519.scalarMultBase(privateObj);

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

// // Convert a hex string to a byte array
function fromHexString(hex: any) {
  for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

export { GenerateX25519KeyPair, ByteArrayToHexString, HexStringToUint8Array, GetShareKeyResult };
