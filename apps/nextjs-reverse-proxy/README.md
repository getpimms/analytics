# PIMMS Analytics with Client-side Click Tracking + Reverse Proxy

This example shows you how you can use the `@pimms/analytics` package with:

- Client-side click tracking for tracking clicks with query parameters in lieu of short links
- A reverse proxy to avoid getting blocked by ad blockers

```ts app/layout.tsx
import { Analytics as PimmsAnalytics } from '@pimms/analytics/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <PimmsAnalytics
        apiHost="/_proxy/pimms"
        domainsConfig={{
          refer: 'go.company.com',
        }}
      />
    </html>
  );
}
```