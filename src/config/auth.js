const DEFAULT_API_ORIGIN = "https://leavesssssssssssssss.onrender.com";

const trimTrailingSlash = (value) => value.replace(/\/$/, "");

const normalizeApiBaseUrl = (value) => {
  const trimmed = trimTrailingSlash(value);
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
};

const normalizeGoogleAuthUrl = (value) => {
  const trimmed = trimTrailingSlash(value);
  if (trimmed.endsWith("/auth/google") && !trimmed.endsWith("/api/auth/google")) {
    return trimmed.replace(/\/auth\/google$/, "/api/auth/google");
  }

  return trimmed;
};

export const API_BASE_URL = normalizeApiBaseUrl(
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_ORIGIN
);

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const GOOGLE_AUTH_URL =
  (import.meta.env.VITE_GOOGLE_AUTH_URL &&
    normalizeGoogleAuthUrl(import.meta.env.VITE_GOOGLE_AUTH_URL)) ||
  apiUrl("/auth/google");
