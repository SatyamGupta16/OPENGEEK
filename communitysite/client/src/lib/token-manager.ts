// Token manager for Clerk authentication
let tokenCache: string | null = null;

export const setAuthToken = (token: string | null) => {
  console.log('Setting auth token:', token ? 'Token set' : 'Token cleared');
  tokenCache = token;
};

export const getAuthToken = (): string | null => {
  console.log('Getting auth token:', tokenCache ? 'Token available' : 'No token');
  return tokenCache;
};

export const clearAuthToken = () => {
  console.log('Clearing auth token');
  tokenCache = null;
};