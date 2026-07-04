'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Languages } from 'lucide-react'
import {
  localeCookieName,
  localeLabels,
  locales,
  type Locale,
} from '@/lib/i18n/config'

type LanguageSwitcherProps = {
  currentLocale: Locale
  label: string
}

export function LanguageSwitcher({
  currentLocale,
  label,
}: LanguageSwitcherProps) {
  const router = useRouter()
  const [isChanging, setIsChanging] = useState(false)

  function handleChange(value: string) {
    if (isChanging || value === currentLocale) {
      return
    }

    setIsChanging(true)
    window.dispatchEvent(new Event('futcon:start-loading'))

    document.cookie = `${localeCookieName}=${value}; path=/; max-age=31536000; SameSite=Lax`
    router.refresh()

    window.setTimeout(() => {
      setIsChanging(false)
    }, 900)
  }

  return (
    <label className="flex w-fit items-center gap-2 rounded-md border bg-background px-2 py-1 text-sm">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <span className="sr-only">{label}</span>

      <select
        value={currentLocale}
        disabled={isChanging}
        onChange={(event) => handleChange(event.target.value)}
        className="bg-transparent text-sm outline-none disabled:opacity-60"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeLabels[locale]}
          </option>
        ))}
      </select>
    </label>
  )
}