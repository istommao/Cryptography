// Create Base64 Object

function Uint8ToString(u8a: any) {
  return btoa(String.fromCharCode.apply(null, u8a));
}

export { Uint8ToString };
