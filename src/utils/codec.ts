// Create Base64 Object

const Uint8ToBase64String = (u8a: any) => {
  return btoa(String.fromCharCode.apply(null, u8a));
};

const ByteArrayToHexString = (byteArray: Uint8Array) => {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};

const Base64ToHex = (base64: string) => {
  // let result = Base64StringToUint8(base64)
  // return ByteArrayToHexString(result)

  const raw = atob(base64);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += hex.length === 2 ? hex : '0' + hex;
  }
  return result;
};

const HexToBase64 = (hexStr: string) => {
  return btoa(
    [...hexStr].reduce(
      (acc, _, i) =>
        (acc += !((i - 1) & 1)
          ? String.fromCharCode(parseInt(hexStr.substring(i - 1, i + 1), 16))
          : ''),
      '',
    ),
  );
};

const Base64StringToUint8 = (base64: string) => {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
};

const ArrayBufferToBase64String = (input: ArrayBuffer) => {
  return Uint8ToBase64String(new Uint8Array(input));
};

export {
  Base64ToHex,
  HexToBase64,
  Uint8ToBase64String,
  Base64StringToUint8,
  ByteArrayToHexString,
  ArrayBufferToBase64String,
};
