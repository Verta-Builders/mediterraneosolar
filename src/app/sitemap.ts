import { MetadataRoute } from 'next';

const host = 'https://www.mediterraneosolar.com';

const locales = ['es', 'en'];
const routes = [
  { path: '', priority: 1.0, freq: 'weekly' },
  { path: '/privacy', priority: 0.5, freq: 'yearly' },
  { path: '/legal', priority: 0.5, freq: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemaps: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemaps.push({
        url: `${host}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.freq as any,
        priority: route.priority,
        alternates: {
          languages: {
            es: `${host}/es${route.path}`,
            en: `${host}/en${route.path}`,
          },
        },
      });
    });
  });

  return sitemaps;
}
