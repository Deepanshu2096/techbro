import api from './api';
import type { EbayProduct } from '@/types/product';

export async function searchProducts(query: string): Promise<EbayProduct[]> {
  const response = await api.get<EbayProduct[]>('/api/ebay/search', {
    params: { q: query },
  });
  return response.data;
}
