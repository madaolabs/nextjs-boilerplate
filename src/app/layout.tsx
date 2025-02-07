import type { Metadata } from "next";
import AppWalletProvider from '@/app/components/AppWalletProvider'
import UITheme from '@/app/components/UITheme'

import "./globals.css";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const metadata: Metadata = {
  title: "Earn SOL",
  description: "Various ways to earn SOL",
  keywords: "reclaim sol,redeem sol"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
