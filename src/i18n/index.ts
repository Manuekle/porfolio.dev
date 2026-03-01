import { atom } from 'nanostores'

export type Language = 'es' | 'en'

export const currentLanguage = atom<Language>('es')

export function toggleLanguage() {
  const current = currentLanguage.get()
  currentLanguage.set(current === 'es' ? 'en' : 'es')
}

export function setLanguage(lang: Language) {
  currentLanguage.set(lang)
}
