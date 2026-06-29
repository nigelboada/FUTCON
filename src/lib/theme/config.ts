export const themes = ['light', 'dark'] as const

export type Theme = (typeof themes)[number]

export const defaultTheme: Theme = 'light'

export const themeCookieName = 'futcon-theme'

export function isTheme(value: string | undefined | null): value is Theme {
  return value === 'light' || value === 'dark'
}