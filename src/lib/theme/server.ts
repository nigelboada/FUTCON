import { cookies } from 'next/headers'
import { defaultTheme, isTheme, themeCookieName, type Theme } from './config'

export async function getTheme(): Promise<Theme> {
  const cookieStore = await cookies()
  const value = cookieStore.get(themeCookieName)?.value

  if (isTheme(value)) {
    return value
  }

  return defaultTheme
}