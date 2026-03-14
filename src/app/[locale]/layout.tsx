import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { getMessages, getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata = {
  title: "Mediterraneo Solar",
  description: "Energías Renovables para tu Hogar. Paneles solares en Alicante.",
};

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

  // Structured Data (JSON-LD)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mediterraneo Solar",
    "url": "https://www.mediterraneosolar.com",
    "logo": "https://www.mediterraneosolar.com/assets/brand/logo.png",
    "sameAs": [
      "https://www.facebook.com/placasypanelessolares/",
      "https://www.instagram.com/mediterraneosolar/",
      "https://share.google/QEBgQBMwhatY7ZTdL"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Mediterraneo Solar",
    "image": "https://www.mediterraneosolar.com/assets/brand/logo.png",
    "url": "https://www.mediterraneosolar.com",
    "telephone": "+34664419949",
    "email": "info.mediterraneosolar@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Partida Alzabaras Bajo, 1127A",
      "addressLocality": "Elx",
      "addressRegion": "Alicante",
      "postalCode": "03290",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 38.26059,
      "longitude": -0.7073114
    }
  };

  return (
    <html lang={currentLocale} className={`${inter.variable} ${jakarta.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
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
