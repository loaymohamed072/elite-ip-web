import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const BASE_URL = "https://eliteip.ae";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Elite IP — Intellectual Property & Corporate Legal Advisory, Dubai",
    template: "%s | Elite IP",
  },
  description:
    "Elite advises premium brands, luxury ventures, and high-value businesses on intellectual property, trademark, and corporate legal strategy across the Gulf region.",
  keywords: [
    "intellectual property Dubai",
    "trademark UAE",
    "IP law firm Dubai",
    "brand protection UAE",
    "copyright lawyer Dubai",
    "trademark registration UAE",
    "IP enforcement GCC",
    "patent filing UAE",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Elite IP — Intellectual Property & Corporate Legal Advisory",
    description: "The IP firm that understands what your brand is worth.",
    url: BASE_URL,
    siteName: "Elite IP",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/dubai-skyline.webp",
        width: 1200,
        height: 630,
        alt: "Elite IP — Intellectual Property & Corporate Legal Advisory, Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite IP — IP & Corporate Legal Advisory, Dubai",
    description: "The IP firm that understands what your brand is worth.",
    images: ["/images/dubai-skyline.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Elite IP",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/elite-logo.png`,
      },
      description:
        "Elite advises premium brands and high-value businesses on intellectual property, trademark, and corporate legal strategy across the UAE and Gulf region.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "AE",
        addressRegion: "Dubai",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        areaServed: ["AE", "SA", "QA", "KW", "BH", "OM"],
      },
    },
    {
      "@type": "LegalService",
      "@id": `${BASE_URL}/#legalservice`,
      name: "Elite IP",
      url: BASE_URL,
      serviceType: [
        "Trademark Registration",
        "IP Enforcement",
        "Copyright Advisory",
        "Patent Filing",
        "Corporate Legal Services",
        "Brand Protection",
      ],
      areaServed: {
        "@type": "Place",
        name: "UAE and Gulf Region",
      },
      provider: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Elite IP",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/insights?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LenisProvider>
          {children}
          <WhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  );
}
