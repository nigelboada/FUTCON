'use client'

import { useRouter } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { themeCookieName, type Theme } from '@/lib/theme/config'

type ThemeToggleProps = {
  currentTheme: Theme
  labels: {
    light: string
    dark: string
    toggle: string
  }
}

export function ThemeToggle({ currentTheme, labels }: ThemeToggleProps) {
  const router = useRouter()
  const isDark = currentTheme === 'dark'

  function toggleTheme() {
    const nextTheme: Theme = isDark ? 'light' : 'dark'

    document.cookie = `${themeCookieName}=${nextTheme}; path=/; max-age=31536000; SameSite=Lax`
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')

    router.refresh()
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      aria-label={labels.toggle}
      title={isDark ? labels.light : labels.dark}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}