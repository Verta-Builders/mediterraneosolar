import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Link',
            value: '<https://www.mediterraneosolar.com/llms.txt>; rel="alternate"; type="text/plain", <https://www.mediterraneosolar.com/.well-known/agent-skills/index.json>; rel="alternate"; type="application/json"'
          }
        ]
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: '/index.md',
        destination: '/llms.txt',
      }
    ];
  }
};

export default withNextIntl(nextConfig);
