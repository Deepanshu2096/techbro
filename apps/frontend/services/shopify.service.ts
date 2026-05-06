import api from './api';
import type { EbayProduct, ImportResult } from '@/types/product';

export async function importProduct(product: EbayProduct): Promise<ImportResult> {
  const response = await api.post<ImportResult>('/api/shopify/import', { product });
  return response.data;
}
