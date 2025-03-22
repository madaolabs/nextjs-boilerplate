import en from './locales/en.json'
import zh from './locales/zh.json'
import es from './locales/es.json'
import ar from './locales/ar.json'
import bn from './locales/bn.json'
import hi from './locales/hi.json'
import ja from './locales/ja.json'
import pa from './locales/pa.json'
import pt from './locales/pt.json'
import ru from './locales/ru.json'
import de from './locales/de.json'

const dictionaries: Record<string, Record<string, string>> = {
    en,
    zh,
    es,
    ar,
    bn,
    hi,
    ja,
    pa,
    pt,
    ru,
    de
}

export const getDictionary = (locale: string) => dictionaries[locale]