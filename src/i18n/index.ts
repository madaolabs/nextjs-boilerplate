import en from './locales/en.json'
import zh from './locales/zh.json'
import es from './locales/es.json'
import ja from './locales/ja.json'
import ru from './locales/ru.json'
import de from './locales/de.json'

const dictionaries: Record<string, Record<string, string>> = {
    en,
    zh,
    es,
    ja,
    ru,
    de
}

export const getDictionary = (locale: string) => dictionaries[locale]