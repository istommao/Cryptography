// Common.js and ECMAScript Modules (ESM)
import * as ed from '@noble/ed25519';
import { Uint8ToString } from '../utils/base64';

const ByteArrayToHexString = (byteArray: Uint8Array) => {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};

const GenerateEd25519KeyPair = async () => {
  let privateObj = ed.utils.randomPrivateKey();

  let pubkeyObj = await ed.getPublicKey(privateObj);

  // let PrivateKey = ByteArrayToHexString(privateObj);
  // let PublicKey = ByteArrayToHexString(pubkeyObj);

  let PrivateKey = Uint8ToString(privateObj);
  let PublicKey = Uint8ToString(pubkeyObj);

  return {
    PrivateKey,
    PublicKey,
  };
};

export { GenerateEd25519KeyPair };
