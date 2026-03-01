import es from './es.json'
import en from './en.json'
import type { Language } from './index'

const translations = { es, en }

export function getTranslations(lang: Language) {
  return translations[lang]
}

export function t(lang: Language, key: string): string {
  const keys = key.split('.')
  let value: any = translations[lang]

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return key
    }
  }

  return typeof value === 'string' ? value : key
}
