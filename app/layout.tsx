import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LendLedger - Smart Money Tracking & Reminders",
  description: "LendLedger is the ultimate finance management and business ledger app. Track loans, manage shop credits, and send WhatsApp reminders. Start your free trial today.",
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/logo-promo.png",
    apple: "/assets/logo-promo.png",
  },
};

export const viewport = {
  themeColor: "#005DFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
