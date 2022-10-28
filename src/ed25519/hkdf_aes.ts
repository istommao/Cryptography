// AES_GCM_256_SHA_384

const fromHexString = (hexString) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

const GetAESBase64Key = async (hex_key: string) => {
  let master_key = await crypto.subtle.importKey('raw', fromHexString(hex_key), 'HKDF', false, [
    'deriveKey',
  ]);

  let aes_key_obj = await window.crypto.subtle.deriveKey(
    { name: 'HKDF', salt: new Uint8Array(), info: new Uint8Array(), hash: 'SHA-384' },
    master_key,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );

  let arrayBuffer = await crypto.subtle.exportKey('raw', aes_key_obj);
  const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

  return base64String;
};

let share_secret_key_hex_format =
  'c1905f18d3336275be318c7924b13d3947f2379cab06d1c5085cb879d4bf4b11';
let aes_key_b64_str = await GetAESBase64Key(share_secret_key_hex_format);

let payload = {
  code: 12356,
};

let iv = aes_key_b64_str;

const result = await AesGCMEncrypt(
  aes_key_b64_str,
  iv,
  new TextEncoder('utf-8').encode(JSON.stringify(payload)),
);

// decrypt
const platText = await AesGCMDecrypt(AesKey, iv, new Uint8Array(result));
let resp = JSON.parse(platText);
