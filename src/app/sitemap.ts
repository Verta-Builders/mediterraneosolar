import { MetadataRoute } from 'next';

const host = 'https://mediterraneosolarweb.web.app'; // Will be replaced with actual domain later

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${host}/es`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: `${host}/es`,
          en: `${host}/en`,
        },
      },
    },
    {
      url: `${host}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${host}/es/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${host}/en/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${host}/es/legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${host}/en/legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    }
  ];
}
