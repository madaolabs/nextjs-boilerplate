import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
    en: () => import('./locales/en'),
    zh: () => import('./locales/zh'),
    ru: () => import('./locales/ru'),
    es: () => import('./locales/es'),
    ja: () => import('./locales/ja'),
    de: () => import('./locales/de')
})