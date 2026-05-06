const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  shopifyApiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY ?? '',
};

export default config;
