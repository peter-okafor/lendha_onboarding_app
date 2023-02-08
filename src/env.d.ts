/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LENDHA_API_URL: string;
  readonly VITE_LENDHA_JWT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
