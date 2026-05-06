'use client';

import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Button,
  Banner,
} from '@shopify/polaris';

export default function DashboardPage() {
  return (
    <Page title="eBay Importer">
      <Layout>
        <Layout.Section>
          <Banner title="Welcome to eBay Importer" tone="info">
            <Text as="p" variant="bodyMd">
              Search eBay products and import them directly into your Shopify store in seconds.
            </Text>
          </Banner>
        </Layout.Section>

        <Layout.Section>
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="300">
                <Text as="h2" variant="headingMd">
                  Quick Actions
                </Text>
                <InlineStack gap="300">
                  <Button url="/products" variant="primary">
                    Search eBay Products
                  </Button>
                  <Button url="/import" variant="secondary">
                    View Import History
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text as="h2" variant="headingMd">
                  How It Works
                </Text>
                <BlockStack gap="200">
                  <Text as="p" variant="bodyMd">
                    1. Search for products on eBay using keywords or category.
                  </Text>
                  <Text as="p" variant="bodyMd">
                    2. Browse the results and select the products you want.
                  </Text>
                  <Text as="p" variant="bodyMd">
                    3. Click <strong>Import</strong> to add them to your Shopify store instantly.
                  </Text>
                </BlockStack>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
