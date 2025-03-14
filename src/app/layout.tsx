import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ppEditorialNew, ttHovesProTrial } from "./fonts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alexandria | The Library of Knowledge",
  description: "Alexandria - AI-powered search inspired by the Library of Alexandria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ppEditorialNew.variable} ${ttHovesProTrial.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
