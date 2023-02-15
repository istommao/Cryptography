import { ripemd160 } from '@noble/hashes/ripemd160';
import { bytesToHex as toHex } from '@noble/hashes/utils';

const ripemd160Hash = async (payload: string) => {
  let result = ripemd160(payload);
  return toHex(result);
};

export { ripemd160Hash };
