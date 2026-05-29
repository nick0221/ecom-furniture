import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/Toast";
import BackToTop from "@/components/home/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WoodCraft | Premium Handcrafted Furniture",
  description:
    "Premium handcrafted furniture for modern living. Discover our collection of sofas, tables, chairs, and more.",
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
      <body className="min-h-full flex flex-col bg-surface">
        <Navbar />
        <main className="flex-1 pt-16 lg:pt-20">{children}</main>
        <Footer />
        <ToastContainer />
        <BackToTop />
      </body>
    </html>
  );
}
