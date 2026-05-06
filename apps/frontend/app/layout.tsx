import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/common/Providers';

export const metadata: Metadata = {
  title: 'eBay Importer',
  description: 'Import eBay products into your Shopify store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="shopify-api-key"
          content={process.env.NEXT_PUBLIC_SHOPIFY_API_KEY ?? ''}
        />
        {/* App Bridge v4 CDN — configures the embedded app automatically */}
        <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
