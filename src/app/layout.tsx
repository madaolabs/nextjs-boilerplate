import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppWalletProvider from '@/app/components/AppWalletProvider'
import UITheme from '@/app/components/UITheme'

import "./globals.css";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Earn SOL",
  description: "Earn SOL using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppWalletProvider>
          <UITheme>
            {children}
          </UITheme>
        </AppWalletProvider>

      </body>
    </html>
  );
}
