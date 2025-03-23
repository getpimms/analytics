# @getpimms/analytics

Easily track and optimize your lead and sales conversions using PIMMS across multiple channels and applications.

## Overview

`@getpimms/analytics` provides a streamlined way to implement conversion tracking on your site or application, helping you identify exactly what generates your leads and conversions.

## Quick Start

Follow these steps to quickly integrate PIMMS analytics:

### 1. Enable Conversion Tracking

Activate conversion tracking for your PIMMS links via the [PIMMS dashboard](https://app.pimms.io).

### 2. Install the Analytics Package

Add the `@getpimms/analytics` package to your project:

```bash
npm install @getpimms/analytics
```

### 3. Inject the Analytics Script

Integrate the tracking script into your application:

**React Example:**

```tsx
import { Analytics as PimmsAnalytics } from '@getpimms/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <PimmsAnalytics />
    </html>
  );
}
```

Alternatively, for other frameworks, use the `inject()` method.

## Available Props

Customize the analytics script by passing props to the `Analytics` component:

### `apiHost`

Defines a custom API host for tracking requests. Useful when using reverse proxies to bypass ad-blockers.

- **Default:** `https://api.pimms.io`

### `domainsConfig`

Configure domains for accurate tracking:

```tsx
<PimmsAnalytics
  domainsConfig={{
    site: "pim.ms",
    outbound: ["yourdomain.com", "anotherdomain.com"],
  }}
/>
```

- `site`: Short domain provided by PIMMS.
- `outbound`: Array of domains enabling cross-domain tracking.

### `attributionModel`

Defines which touchpoint receives conversion credit:

- **Default:** `last-click`

Available options:
- `first-click`: Credits the initial user interaction.
- `last-click`: Credits the final user interaction.

Example:

```tsx
<PimmsAnalytics attributionModel="first-click" />
```

### `cookieOptions`

Customize the cookie behavior for tracking:

| Key             | Default             | Description                                                  | Example                   |
|-----------------|---------------------|--------------------------------------------------------------|---------------------------|
| `domain`        | `null`              | Domain scope of the cookie                                   | `example.com`             |
| `expires`       | 90 days from now    | Explicit expiry date                                         | `new Date('2024-12-31')`  |
| `expiresInDays` | `90`                | Number of days before the cookie expires                     | `60`                      |
| `path`          | `/`                 | URL path the cookie applies to                               | `/`                       |

Example (set a 60-day cookie lifespan):

```tsx
<PimmsAnalytics cookieOptions={{ expiresInDays: 60 }} />
```

### `queryParam`

Specifies the URL parameter to use for tracking (e.g., referral codes):

- **Default:** `via`

Example:

```
?ref=john_doe
```

To use `ref` instead of the default:

```tsx
<PimmsAnalytics queryParam="ref" />
```

### `scriptProps`

Custom attributes for the injected `<script>` tag. See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement) for all available options.

Example:

```tsx
<PimmsAnalytics scriptProps={{ defer: true }} />
```

## Next Steps

[Sign up for PIMMS today →](https://app.pimms.io/register)

[Introduction to conversion tracking | blog →](https://pimms.io/blog/introducing-conversion-tracking)