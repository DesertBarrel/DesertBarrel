import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/site-config";
import { ASSET_REGISTRY } from "@/lib/asset-registry";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.website),
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.ticker}`,
  description:
    "DBRL is built for pressure, scarcity, and attention. Original meme asset. Community-driven. High risk.",
  applicationName: SITE_CONFIG.name,
  keywords: [
    SITE_CONFIG.name,
    SITE_CONFIG.ticker,
    "meme asset",
    "community token",
    "crypto launch"
  ],
  openGraph: {
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.ticker}`,
    description: "DBRL is built for pressure, scarcity, and attention.",
    url: SITE_CONFIG.website,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} | ${SITE_CONFIG.ticker}`
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.ticker}`,
    description: "DBRL is built for pressure, scarcity, and attention.",
    images: [SITE_CONFIG.ogImage]
  },
  icons: {
    icon: ASSET_REGISTRY.favicon,
    shortcut: ASSET_REGISTRY.favicon,
    apple: ASSET_REGISTRY.appleTouchIcon
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
