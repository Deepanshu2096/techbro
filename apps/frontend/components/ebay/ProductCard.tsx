'use client';

import { Card, Text, BlockStack, InlineStack, Button, Thumbnail, Badge } from '@shopify/polaris';
import { ImageIcon } from '@shopify/polaris-icons';
import type { EbayProduct } from '@/types/product';

interface ProductCardProps {
  product: EbayProduct;
  onImport: (product: EbayProduct) => void;
  importing?: boolean;
}

export default function ProductCard({ product, onImport, importing = false }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency || 'USD',
  }).format(product.price);

  return (
    <Card>
      <BlockStack gap="300">
        <InlineStack gap="300" align="start" blockAlign="start">
          <Thumbnail
            source={product.imageUrl || ImageIcon}
            alt={product.title}
            size="large"
          />
          <BlockStack gap="100">
            <Text as="h3" variant="headingSm" breakWord>
              {product.title}
            </Text>
            <Badge>{product.condition}</Badge>
            <Text as="p" variant="bodyMd" tone="subdued">
              {product.seller}
            </Text>
          </BlockStack>
        </InlineStack>

        <InlineStack align="space-between" blockAlign="center">
          <Text as="p" variant="headingMd" tone="success">
            {formattedPrice}
          </Text>
          <Button
            variant="primary"
            onClick={() => onImport(product)}
            loading={importing}
            disabled={importing}
          >
            Import
          </Button>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}
