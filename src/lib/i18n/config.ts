export const locales = ['ca', 'es', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ca'

export const localeCookieName = 'futcon-locale'

export const localeLabels: Record<Locale, string> = {
  ca: 'Català',
  es: 'Castellano',
  en: 'English',
}

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'ca' || value === 'es' || value === 'en'
}
