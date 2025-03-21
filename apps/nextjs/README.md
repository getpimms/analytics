# PIMMS Analytics with Next.js

This example shows you how you can use the `@pimms/analytics` package with Next.js.


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
      <PimmsAnalytics />
    </html>
  );
}
```