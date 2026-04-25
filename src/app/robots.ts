import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/private',
      },
      {
        userAgent: ['Google-Extended', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot'],
        allow: '/',
      }
    ],
    sitemap: 'https://www.mediterraneosolar.com/sitemap.xml',
  };
}
