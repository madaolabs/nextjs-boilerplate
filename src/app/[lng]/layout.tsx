import { dir } from "i18next";

import UITheme from '@/app/[lng]/components/UITheme'


import "./globals.css";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { fallbackLng, languages } from "@/i18n/settings";
import { getI18n } from "@/i18n/server";
import { I18nProviderClient } from "@/i18n/client";



async function RootLayout({ children, params, }: React.PropsWithChildren<{ params: Promise<{ lng: string }> }>) {
  const { lng } = await params;
  const t = await getI18n()
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <title>{t('title')}</title>
        <meta name="description" content={t('seoDescription')}></meta>
        <meta name="keywords" content={t('seoKeywords')}></meta>
        {languages.map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/${fallbackLng}`}
        />
      </head>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UITheme>
          <I18nProviderClient locale={lng}>
            {children}
          </I18nProviderClient>
        </UITheme>

      </body>
    </html>
  );
}

export default RootLayout
