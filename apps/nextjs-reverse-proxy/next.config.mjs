/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // for pimms proxy
      {
        source: '/_proxy/pimms/track/click',
        destination: 'https://api.pimms.io/track/click',
      },
    ];
  },
};

export default nextConfig;
