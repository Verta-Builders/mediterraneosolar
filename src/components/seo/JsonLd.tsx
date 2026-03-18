import React from 'react';

export const OrganizationJsonLd = () => {
  const schema = {
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
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

export const LocalBusinessJsonLd = ({
  city = "Elx",
  region = "Alicante",
  postalCode = "03290",
  latitude = 38.281056,
  longitude = -0.625389,
  areaServed = ["Elx", "Alicante", "Santa Pola", "Crevillent", "Torrevieja", "San Vicente del Raspeig"]
}) => {
  const schema = {
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
      "addressLocality": city,
      "addressRegion": region,
      "postalCode": postalCode,
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": latitude,
      "longitude": longitude
    },
    "areaServed": areaServed.map(area => ({
      "@type": "City",
      "name": area
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Energía Renovables",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Instalación de Placas Solares"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Climatización (Aire Acondicionado y Calefacción)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Instalaciones Eléctricas"
          }
        }
      ]
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

export const FAQJsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué soluciones de energía renovable ofrecen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Somos especialistas en placas solares, climatización (aire acondicionado y calefacción) e instalaciones eléctricas en general para residencias."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuáles son los beneficios de cambiar a la energía solar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cambiar a energías renovables reduce significativamente los costes operativos (ahorrando hasta un 80% en facturas), disminuye tu huella de carbono y aumenta el valor de tu propiedad."
        }
      },
      {
        "@type": "Question",
        "name": "¿Gestionan los trámites legales y las subvenciones?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, nosotros tramitamos toda la legalización de las instalaciones y ofrecemos asesoramiento sobre las subvenciones, deducciones y ayudas que quieras tramitar."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta una instalación de placas solares?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Depende del tamaño de tu vivienda y de tu consumo. Cada proyecto es diferente, por eso siempre hacemos un presupuesto gratuito y sin compromiso para que sepas el precio exacto desde el principio, sin sorpresas."
        }
      }
    ]
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};
