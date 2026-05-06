'use client';

import { useState, useCallback } from 'react';
import { Frame, Navigation, TopBar, Text } from '@shopify/polaris';
import { HomeIcon, ProductIcon, ImportIcon } from '@shopify/polaris-icons';
import { usePathname } from 'next/navigation';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleNavToggle = useCallback(() => setMobileNavOpen((v) => !v), []);
  const handleNavDismiss = useCallback(() => setMobileNavOpen(false), []);

  const topBar = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={handleNavToggle}
      contextControl={
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '12px' }}>
          <Text as="p" variant="headingSm" tone="text-inverse">
            eBay Importer
          </Text>
        </div>
      }
    />
  );

  const navigation = (
    <Navigation location={pathname}>
      <Navigation.Section
        items={[
          {
            url: '/',
            label: 'Dashboard',
            icon: HomeIcon,
            selected: pathname === '/',
          },
          {
            url: '/products',
            label: 'Search Products',
            icon: ProductIcon,
            selected: pathname === '/products',
          },
          {
            url: '/import',
            label: 'Import History',
            icon: ImportIcon,
            selected: pathname === '/import',
          },
        ]}
      />
    </Navigation>
  );

  return (
    <Frame
      topBar={topBar}
      navigation={navigation}
      showMobileNavigation={mobileNavOpen}
      onNavigationDismiss={handleNavDismiss}
    >
      {children}
    </Frame>
  );
}
