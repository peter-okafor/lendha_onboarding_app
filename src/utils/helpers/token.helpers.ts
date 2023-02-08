import { AES, enc } from 'crypto-js';
const env = import.meta.env;

export const encryptToken = (str: string) => {
  return AES.encrypt(str, env.VITE_LENDHA_JWT_SECRET).toString();
};

export const decryptToken = (str: string) => {
  const bytes = AES.decrypt(str, env.VITE_LENDHA_JWT_SECRET);
  return bytes.toString(enc.Utf8);
};
