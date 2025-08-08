// Simple token manager for Clerk authentication - no expiration checks
let tokenCache: string | null = null;

export const setAuthToken = (token: string | null) => {
  tokenCache = token;
};

export const getAuthToken = (): string | null => {
  return tokenCache;
};

export const clearAuthToken = () => {
  tokenCache = null;
};