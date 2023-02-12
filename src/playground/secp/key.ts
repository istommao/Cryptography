// Common.js and ECMAScript Modules (ESM)
import * as secp from '@noble/secp256k1';
// If you're using single file, use global variable instead: `window.nobleSecp256k1`

import * as utils from '../../utils/codec';

// @ts-ignore
import * as keccak256 from 'keccak256';

const GetAddressFromPubkey = async (pubkey: string) => {
  let result = keccak256(pubkey).toString('hex');

  var slicedHash = '0x' + result.slice(-40);

  return slicedHash;
};

const GenerateSecp256k1KeyPair = async (export_type: string) => {
  const privKey = secp.utils.randomPrivateKey();
  const pubKey = secp.getPublicKey(privKey);

  let PrivateKey = utils.ByteArrayToHexString(privKey);
  let PublicKey = utils.ByteArrayToHexString(pubKey);

  return {
    PrivateKey,
    PublicKey,
  };
};

export { GetAddressFromPubkey, GenerateSecp256k1KeyPair };
