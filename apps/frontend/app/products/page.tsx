'use client';

import { useState, useCallback } from 'react';
import {
  Page,
  Layout,
  Card,
  TextField,
  Button,
  InlineStack,
  BlockStack,
  Text,
  Banner,
  Spinner,
  EmptyState,
} from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import ProductCard from '@/components/ebay/ProductCard';
import { searchProducts } from '@/services/ebay.service';
import { importProduct } from '@/services/shopify.service';
import type { EbayProduct } from '@/types/product';

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<EbayProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [importingId, setImportingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setProducts([]);

    try {
      const results = await searchProducts(query.trim());
      setProducts(results);
    } catch {
      setError('Failed to search eBay products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [query]);

  const handleImport = useCallback(async (product: EbayProduct) => {
    setImportingId(product.itemId);
    setSuccessMessage(null);
    setError(null);

    try {
      const result = await importProduct(product);
      if (result.success) {
        setSuccessMessage(`"${product.title}" imported successfully.`);
      } else {
        setError(result.message);
      }
    } catch {
      setError('Failed to import product. Please try again.');
    } finally {
      setImportingId(null);
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') handleSearch();
    },
    [handleSearch],
  );

  return (
    <Page title="Search eBay Products">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Find Products
              </Text>
              <InlineStack gap="200" blockAlign="end">
                <div style={{ flex: 1 }} onKeyDown={handleKeyDown}>
                  <TextField
                    label="Search query"
                    labelHidden
                    placeholder="e.g. vintage leather jacket, iPhone 15..."
                    value={query}
                    onChange={setQuery}
                    autoComplete="off"
                    prefix={<SearchIcon />}
                  />
                </div>
                <Button
                  variant="primary"
                  onClick={handleSearch}
                  loading={loading}
                  disabled={!query.trim()}
                >
                  Search
                </Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        {error && (
          <Layout.Section>
            <Banner title="Error" tone="critical" onDismiss={() => setError(null)}>
              <Text as="p" variant="bodyMd">{error}</Text>
            </Banner>
          </Layout.Section>
        )}

        {successMessage && (
          <Layout.Section>
            <Banner title="Success" tone="success" onDismiss={() => setSuccessMessage(null)}>
              <Text as="p" variant="bodyMd">{successMessage}</Text>
            </Banner>
          </Layout.Section>
        )}

        <Layout.Section>
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
              <Spinner size="large" />
            </div>
          )}

          {!loading && products.length === 0 && query && !error && (
            <EmptyState
              heading="No products found"
              image=""
            >
              <Text as="p" variant="bodyMd">
                Try a different search term.
              </Text>
            </EmptyState>
          )}

          {!loading && products.length > 0 && (
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd" tone="subdued">
                {products.length} result{products.length !== 1 ? 's' : ''} found
              </Text>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '16px',
                }}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.itemId}
                    product={product}
                    onImport={handleImport}
                    importing={importingId === product.itemId}
                  />
                ))}
              </div>
            </BlockStack>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
