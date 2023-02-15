import createKeccakHash from 'keccak';

const keccak256Hash = async (payload: string) => {
  let format = 'hex';
  let result = createKeccakHash('keccak256').update(payload).digest(format);

  return result;
};

const keccak224Hash = async (payload: string) => {
  let format = 'hex';
  let result = createKeccakHash('keccak224').update(payload).digest(format);

  return result;
};

const keccak512Hash = async (payload: string) => {
  let format = 'hex';
  let result = createKeccakHash('keccak512').update(payload).digest(format);

  return result;
};

const keccak384Hash = async (payload: string) => {
  let format = 'hex';
  let result = createKeccakHash('keccak384').update(payload).digest(format);

  return result;
};

export { keccak224Hash, keccak256Hash, keccak384Hash, keccak512Hash };
