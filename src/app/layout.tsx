import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
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

const merriweather = Merriweather({
  variable: "--font-merriweather-serif",
  weight: ["700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
