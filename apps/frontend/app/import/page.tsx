'use client';

import { Page, Layout, Card, Text } from '@shopify/polaris';

export default function ImportPage() {
  return (
    <Page title="Import History">
      <Layout>
        <Layout.Section>
          <Card>
            <Text as="p" variant="bodyMd" tone="subdued">
              Import history will appear here once you start importing products.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
