// This is a frontend-only tamper-detection layer for demo purposes. It is NOT a substitute for backend authorization - in production, all authorization must be enforced server-side via a signed token (JWT) that the frontend cannot forge.
const SECRET_STRING = "NHG_FRONTEND_DEMO_AUTH_STORAGE_SECRET_2026";
const AUTH_DATA_KEY = "authData";
const AUTH_CHECKSUM_KEY = "authDataChecksum";

const textEncoder = new TextEncoder();

const bytesToHex = (buffer) =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

const createChecksum = async (serializedAuthData) => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    textEncoder.encode(`${serializedAuthData}${SECRET_STRING}`)
  );

  return bytesToHex(digest);
};

const notifyAuthChanged = () => {
  window.dispatchEvent(new Event("authDataChanged"));
};

export const saveAuthData = async (authData) => {
  const serializedAuthData = JSON.stringify(authData);
  const checksum = await createChecksum(serializedAuthData);

  localStorage.setItem(AUTH_DATA_KEY, serializedAuthData);
  localStorage.setItem(AUTH_CHECKSUM_KEY, checksum);
  notifyAuthChanged();
};

export const getAuthData = async () => {
  const serializedAuthData = localStorage.getItem(AUTH_DATA_KEY);
  const storedChecksum = localStorage.getItem(AUTH_CHECKSUM_KEY);

  if (!serializedAuthData || !storedChecksum) {
    clearAuthData();
    return null;
  }

  try {
    const expectedChecksum = await createChecksum(serializedAuthData);

    if (expectedChecksum !== storedChecksum) {
      clearAuthData();
      return null;
    }

    return JSON.parse(serializedAuthData);
  } catch {
    clearAuthData();
    return null;
  }
};

export const clearAuthData = () => {
  localStorage.removeItem(AUTH_DATA_KEY);
  localStorage.removeItem(AUTH_CHECKSUM_KEY);
  notifyAuthChanged();
};

export const getStoredAuthDataSync = () => {
  const serializedAuthData = localStorage.getItem(AUTH_DATA_KEY);
  const storedChecksum = localStorage.getItem(AUTH_CHECKSUM_KEY);

  if (!serializedAuthData || !storedChecksum) return null;

  try {
    return JSON.parse(serializedAuthData);
  } catch {
    clearAuthData();
    return null;
  }
};
