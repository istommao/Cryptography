// Common.js and ECMAScript Modules (ESM)
import * as ed from '@noble/ed25519';

function ByteArrayToHexString(byteArray) {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
}

const GenerateEd25519KeyPair = async () => {
  let privateObj = ed.utils.randomPrivateKey();

  let pubkeyObj = await ed.getPublicKey(privateObj);

  let PrivateKey = ByteArrayToHexString(privateObj);
  let PublicKey = ByteArrayToHexString(pubkeyObj);
  return {
    PrivateKey,
    PublicKey,
  };
};

export { GenerateEd25519KeyPair };
