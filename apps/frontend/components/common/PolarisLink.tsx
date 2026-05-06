'use client';

import { forwardRef } from 'react';
import NextLink from 'next/link';

interface PolarisLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  url: string;
  children?: React.ReactNode;
}

// Adapts Polaris's linkComponent interface to Next.js Link for client-side navigation.
const PolarisLink = forwardRef<HTMLAnchorElement, PolarisLinkProps>(
  ({ url, children, ...rest }, ref) => (
    <NextLink href={url} ref={ref} {...rest}>
      {children}
    </NextLink>
  ),
);

PolarisLink.displayName = 'PolarisLink';

export default PolarisLink;
