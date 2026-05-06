export interface EbayProduct {
  itemId: string;
  title: string;
  price: number;
  currency: string;
  imageUrl: string;
  itemUrl: string;
  condition: string;
  seller: string;
}

export interface ImportResult {
  success: boolean;
  shopifyProductId?: string;
  message: string;
}
