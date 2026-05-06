import axios from 'axios';
import config from '@/config';

const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.request.use((req) => {
  // Attach the Shopify session token if App Bridge is initialized
  if (typeof window !== 'undefined' && (window as any).shopify?.idToken) {
    (window as any).shopify.idToken().then((token: string) => {
      req.headers['Authorization'] = `Bearer ${token}`;
    });
  }
  return req;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error?.response?.data ?? error.message);
    return Promise.reject(error);
  },
);

export default api;
