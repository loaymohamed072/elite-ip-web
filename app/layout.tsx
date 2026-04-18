import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

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
  title: "Elite IP — Intellectual Property & Corporate Legal Advisory, Dubai",
  description:
    "Elite advises premium brands, luxury ventures, and high-value businesses on intellectual property, trademark, and corporate legal strategy across the Gulf region.",
  keywords: ["intellectual property Dubai", "trademark UAE", "IP law firm Dubai", "brand protection UAE", "copyright lawyer Dubai"],
  openGraph: {
    title: "Elite IP — Intellectual Property & Corporate Legal Advisory",
    description: "The IP firm that understands what your brand is worth.",
    locale: "en_AE",
    type: "website",
  },
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
      <body>
        <LenisProvider>
          {children}
          <WhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  );
}
