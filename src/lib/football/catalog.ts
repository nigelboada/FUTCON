import type { Locale } from '@/lib/i18n/config'

export const footballModalities = [
  {
    value: 'male',
    labels: { ca: 'Futbol masculí', es: 'Fútbol masculino', en: 'Men’s football' },
  },
  {
    value: 'female',
    labels: { ca: 'Futbol femení', es: 'Fútbol femenino', en: 'Women’s football' },
  },
] as const

export const footballCategories = [
  {
    value: 'senior',
    labels: { ca: 'Sènior / Amateur', es: 'Sénior / Amateur', en: 'Senior / Amateur' },
  },
  {
    value: 'juvenil',
    labels: { ca: 'Juvenil', es: 'Juvenil', en: 'Youth U19' },
  },
  {
    value: 'cadet',
    labels: { ca: 'Cadet', es: 'Cadete', en: 'U16 / Cadet' },
  },
  {
    value: 'infantil',
    labels: { ca: 'Infantil', es: 'Infantil', en: 'U14 / Infantil' },
  },
  {
    value: 'alevi',
    labels: { ca: 'Aleví', es: 'Alevín', en: 'U12 / Aleví' },
  },
  {
    value: 'benjami',
    labels: { ca: 'Benjamí', es: 'Benjamín', en: 'U10 / Benjamí' },
  },
] as const

export const footballDivisions: Record<string, Record<string, string[]>> = {
  male: {
    senior: [
      'Lliga Elit',
      'Primera Catalana',
      'Segona Catalana',
      'Tercera Catalana',
      'Quarta Catalana',
    ],
    juvenil: [
      'Divisió d’Honor Juvenil',
      'Lliga Nacional Juvenil',
      'Preferent Juvenil',
      'Primera Divisió Juvenil',
      'Segona Divisió Juvenil',
    ],
    cadet: [
      'Divisió d’Honor Cadet',
      'Preferent Cadet',
      'Primera Divisió Cadet',
      'Segona Divisió Cadet',
    ],
    infantil: [
      'Divisió d’Honor Infantil',
      'Preferent Infantil',
      'Primera Divisió Infantil',
      'Segona Divisió Infantil',
    ],
    alevi: [
      'Preferent Aleví',
      'Primera Divisió Aleví',
      'Segona Divisió Aleví',
      'Tercera Divisió Aleví',
    ],
    benjami: [
      'Preferent Benjamí',
      'Primera Divisió Benjamí',
      'Segona Divisió Benjamí',
      'Tercera Divisió Benjamí',
    ],
  },

  female: {
    senior: [
      'Preferent Femení',
      'Primera Divisió Femení',
      'Segona Divisió Femení',
    ],
    juvenil: [
      'Preferent Juvenil Femení',
      'Primera Divisió Juvenil Femení',
      'Segona Divisió Juvenil Femení',
    ],
    cadet: [
      'Preferent Cadet Femení',
      'Primera Divisió Cadet Femení',
      'Segona Divisió Cadet Femení',
    ],
    infantil: [
      'Preferent Infantil Femení',
      'Primera Divisió Infantil Femení',
      'Segona Divisió Infantil Femení',
    ],
    alevi: [
      'Preferent Aleví Femení',
      'Primera Divisió Aleví Femení',
      'Segona Divisió Aleví Femení',
    ],
    benjami: [
      'Preferent Benjamí Femení',
      'Primera Divisió Benjamí Femení',
      'Segona Divisió Benjamí Femení',
    ],
  },
}

export const coachLicenses = [
  'UEFA Grassroots Leader',
  'UEFA C',
  'UEFA B',
  'UEFA A',
  'UEFA Pro',
  'Nacional C - Futbol Sala',
  'Nacional B - Futbol Sala',
  'Especialista en entrenament de porters',
  'Preparació física / formació complementària',
  'Altres',
] as const

export function getLocalizedLabel(
  item: { labels: Record<Locale, string> },
  locale: Locale
) {
  return item.labels[locale] ?? item.labels.ca
}