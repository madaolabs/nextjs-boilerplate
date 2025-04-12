"use client"
import { createI18nClient } from 'next-international/client'

export const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  en: () => import('./locales/en'),
  zh: () => import('./locales/zh'),
  ru: () => import('./locales/ru'),
  es: () => import('./locales/es'),
  ja: () => import('./locales/ja'),
  de: () => import('./locales/de')
})