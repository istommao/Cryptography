// Common.js and ECMAScript Modules (ESM)
import * as ed from '@noble/ed25519';
import { Uint8ToString } from '../utils/base64';

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

export { GenerateEd25519KeyPair };
