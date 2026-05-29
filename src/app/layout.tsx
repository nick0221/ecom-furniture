import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/Toast";
import BackToTop from "@/components/home/BackToTop";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageTransition from "@/components/ui/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://woodcraft.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WoodCraft | Premium Handcrafted Furniture",
    template: "%s | WoodCraft",
  },
  description:
    "Premium handcrafted furniture for modern living. Discover our curated collection of sofas, tables, chairs, beds, and more.",
  keywords: [
    "furniture",
    "handcrafted furniture",
    "premium furniture",
    "sofas",
    "dining tables",
    "bedroom furniture",
    "modern furniture",
    "wood furniture",
    "Philippines furniture",
    "online furniture shop",
  ],
  authors: [{ name: "WoodCraft" }],
  creator: "WoodCraft",
  publisher: "WoodCraft",
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteUrl,
    siteName: "WoodCraft",
    title: "WoodCraft | Premium Handcrafted Furniture",
    description:
      "Premium handcrafted furniture for modern living. Explore sofas, tables, chairs, and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WoodCraft — Premium Handcrafted Furniture",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WoodCraft | Premium Handcrafted Furniture",
    description:
      "Premium handcrafted furniture for modern living. Explore sofas, tables, chairs, and more.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className="min-h-full flex flex-col bg-surface">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1 pt-16 lg:pt-20">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ToastContainer />
        <BackToTop />
      </body>
    </html>
  );
}
