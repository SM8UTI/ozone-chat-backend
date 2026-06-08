import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ozone Shower Advisor | Find Your Perfect Shower Enclosure",
  description:
    "AI-powered shower advisor by Ozone India. Get personalized recommendations for glass shower enclosures, fittings, and accessories.",
  openGraph: {
    title: "Ozone Shower Advisor",
    description:
      "Find your perfect glass shower enclosure with AI-powered recommendations from Ozone India.",
    images: ["https://www.ozone.in/files/Images/logo.png"],
    siteName: "Ozone Overseas Pvt. Ltd",
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
