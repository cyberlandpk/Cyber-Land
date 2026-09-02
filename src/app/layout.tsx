import type { Metadata, Viewport } from "next";
import { Inter, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AppProviders from "@/components/providers/AppProviders";
import SiteShell from "@/components/layout/SiteShell";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#BC0000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Cyber Land: Laptops, Gaming PCs, Hardware & Accessories",
    template: "%s | Cyber Land",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  keywords: [
    "Cyber Land",
    "laptops",
    "gaming PCs",
    "computer hardware",
    "gaming accessories",
    "gaming keyboard",
    "gaming mouse",
    "mechanical keyboard",
    "computer accessories",
    "electronics",
    "Pakistan",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Cyber Land: Laptops, Gaming PCs, Hardware & Accessories",
    description: siteConfig.description,
    images: [
      {
        url: "/brand/cyber-land-logo-original.jpeg",
        width: 710,
        height: 719,
        alt: "Cyber Land Computer Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Land: Laptops, Gaming PCs & Tech Accessories",
    description: siteConfig.description,
    images: ["/brand/cyber-land-logo-original.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jost.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <AppProviders>
          <SiteShell>{children}</SiteShell>
        </AppProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
