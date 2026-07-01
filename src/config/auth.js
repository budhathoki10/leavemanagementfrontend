const DEFAULT_API_BASE_URL = "https://leavesssssssssssssss.onrender.com";

const trimTrailingSlash = (value) => value.replace(/\/$/, "");

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
);

export const GOOGLE_AUTH_URL =
  import.meta.env.VITE_GOOGLE_AUTH_URL || `${API_BASE_URL}/auth/google`;
