import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import PageViewTracker from "@/components/PageViewTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: 'swap', // Add this for better performance
  preload: true,   // Ensure font is preloaded
});

export const metadata: Metadata = {
  title: "HackMotion - Imrpove your golf game",
  description: "Custom golf improvement solutions based on your skill level",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexSans.variable} antialiased bg-[#e6e6e6]`}
      >
        <PageViewTracker />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
