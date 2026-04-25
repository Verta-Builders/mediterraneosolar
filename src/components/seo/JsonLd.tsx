import React from 'react';

export const OrganizationJsonLd = () => null; // Kept for backwards compatibility if imported elsewhere, but we'll use LocalBusiness for the main @graph

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
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "HVACBusiness"],
        "@id": "https://www.mediterraneosolar.com/#organization",
        "name": "Mediterraneo Solar Energías Renovables",
        "url": "https://www.mediterraneosolar.com",
        "logo": "https://www.mediterraneosolar.com/assets/brand/logo.png",
        "image": "https://www.mediterraneosolar.com/assets/brand/logo.png",
        "description": "Mediterraneo Solar Energías Renovables is a trusted HVAC and Home Construction Business founded in 2020 by Diego Gonzalez. With over 120+ installations and a 5/5 on Google Reviews, we specialize in solar energy, HVAC, and electrical services in Alicante, operating within a 50km radius.",
        "foundingDate": "2020",
        "founder": {
          "@type": "Person",
          "name": "Diego Gonzalez"
        },
        "telephone": ["+34621230525", "+34664419949"],
        "email": "info.mediterraneosolar@gmail.com",
        "priceRange": "€€",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "19:00"
        },
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
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": latitude,
            "longitude": longitude
          },
          "geoRadius": "50000"
        },
        "sameAs": [
          "https://maps.app.goo.gl/SAHCRHmjkyZmMcLA7",
          "https://share.google/l3eyK9A9feXoACLnw",
          "https://www.google.com/search?client=firefox-b-d&hs=i1lp&sca_esv=8de6bca2391c3c3e&sxsrf=ANbL-n6NdWWgCbOJ8IR59osP1eGdMwRReQ:1777125930547&q=MEDITERRANEO+SOLAR+ENERG%C3%8DAS+RENOVABLES&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOdRV0G68nL8EqzSZF7DkS_ajyS4nN2J-RrEH8U9rwO0krTb_7UnBGfciGcQcV1OviPVvEPM%3D&uds=ALYpb_mOSBfVE_qjsUIUDwhXk-cvIlw_kJbQeCxVTILru_TFvvJKXmYTcNbQVtkDGp6qvDJSKL93w0Zft3TOxR1_l-2s2DLyenYgIhnw4vBlqHsaKa6thJhXnv5DqhvLFt98DzoApJkLkymyyRkLs1XhMoY5pdKZZw&sa=X&ved=2ahUKEwityb7-lYmUAxUGB9sEHdl0CboQ3PALegQIGxAE&biw=3237&bih=1375&dpr=1",
          "https://www.facebook.com/placasypanelessolares/",
          "https://www.instagram.com/mediterraneosolar/"
        ],
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
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.mediterraneosolar.com"
          }
        ]
      }
    ]
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
