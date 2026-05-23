import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import config from '../data/config.json';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: config.meta.title,
    template: `%s · ${config.name}`,
  },
  description: config.meta.description,
  openGraph: {
    type: "website",
    title: config.meta.title,
    description: config.meta.description,
    siteName: config.name,
    images: [{ url: "/img/profile.jpg", width: 300, height: 300, alt: config.name }],
  },
  twitter: {
    card: "summary",
    title: config.meta.title,
    description: config.meta.description,
    images: ["/img/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-foreground focus:text-background focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: config.name,
              description: config.meta.description,
              image: "/img/profile.jpg",
              sameAs: [
                config.social.linkedin,
                config.social.github,
                config.social.x,
                config.social.medium,
              ].filter(Boolean),
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
