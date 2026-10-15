export const locales = ['ca', 'es', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ca'

export const localeCookieName = 'futcon-locale'

// Dates are formatted on the server (UTC on Vercel) and in the browser, so both
// must use the same zone to show the right time and avoid hydration mismatches.
export const appTimeZone = 'Europe/Madrid'

export const localeLabels: Record<Locale, string> = {
  ca: 'Català',
  es: 'Español',
  en: 'English',
}

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'ca' || value === 'es' || value === 'en'
}
