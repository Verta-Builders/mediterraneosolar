import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { getMessages, getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Script from "next/script";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import { OrganizationJsonLd, LocalBusinessJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from 'next';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const host = 'https://www.mediterraneosolar.com';
  const path = locale === 'es' ? '/es' : '/en';

  return {
    title: "Mediterraneo Solar | Energías Renovables para tu Hogar",
    description: "Paneles solares en Alicante. Ahorra hasta un 80% en tus facturas con Mediterraneo Solar. Instalación, mantenimiento y legalización de sistemas fotovoltaicos.",
    metadataBase: new URL(host),
    alternates: {
      canonical: path,
      languages: {
        'es': '/es',
        'en': '/en',
      },
    },
    openGraph: {
      title: "Mediterraneo Solar | Energías Renovables para tu Hogar",
      description: "Paneles solares en Alicante. Ahorra hasta un 80% en tus facturas.",
      url: host + path,
      siteName: 'Mediterraneo Solar',
      images: [
        {
          url: `${host}/assets/brand/preview-hero.png`,
          width: 800,
          height: 600,
          alt: 'Mediterraneo Solar Logo',
        },
      ],
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Mediterraneo Solar | Energías Renovables",
      description: "Paneles solares en Alicante. Ahorra hasta un 80% en tus facturas.",
      images: [`${host}/assets/brand/preview-hero.png`],
    },
    verification: {
      google: "M-SLVaJeJLpg5IkOKs8vzLT3nWeHMYm2sWkgYdhqSSQ",
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const currentLocale = await getLocale();

  return (
    <html lang={currentLocale} className={`${inter.variable} ${jakarta.variable} scroll-smooth`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TTNJHZY5VK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TTNJHZY5VK');
          `}
        </Script>
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <FAQJsonLd />
      </head>
      <body className="antialiased selection:bg-primary-500 selection:text-white">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
