'use client';

import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import PolarisLink from './PolarisLink';
import AppShell from './AppShell';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AppProvider i18n={enTranslations} linkComponent={PolarisLink}>
      <AppShell>{children}</AppShell>
    </AppProvider>
  );
}
