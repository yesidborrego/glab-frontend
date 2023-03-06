import { EncryptStorage } from "storage-encryption";

export const LocalStorageEncrypt = new EncryptStorage(
  import.meta.env.VITE_LOCAL_STORAGE_ENCRYPT_SECRET,
  "localStorage"
);
