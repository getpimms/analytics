import { useEffect } from 'react';
import { inject } from './generic';
import type { AnalyticsProps } from './types';

/**
 * Injects the PIMMS Web Analytics script into the page head.
 * @param props - Analytics options.
 * ```js
 * import { Analytics as PimmsAnalytics } from '@pimms/analytics/react';
 *
 * export default function App() {
 *  return (
 *    <div>
 *      <PimmsAnalytics />
 *      <h1>My App</h1>
 *    </div>
 *  );
 * }
 * ```
 */
function Analytics(props: AnalyticsProps): null {
  useEffect(() => {
    inject(props);
  }, [props]);

  return null;
}

export { Analytics };
export type { AnalyticsProps };
