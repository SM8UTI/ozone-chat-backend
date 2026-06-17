import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stamper | Is Your Interiors Quote Actually Fair?",
  description:
    "AI-powered quotation advisor. Get expert, independent review of your interior quotation and learn how to negotiate it down.",
  openGraph: {
    title: "Stamper",
    description:
      "Get expert, independent review of your interior quotation and learn how to negotiate it down.",
    images: [],
    siteName: "Stamper",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
