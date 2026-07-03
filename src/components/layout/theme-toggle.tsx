'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Cog, Moon, Sun } from 'lucide-react'
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
  const [isSwitching, setIsSwitching] = useState(false)
  const isDark = currentTheme === 'dark'

  function toggleTheme() {
    if (isSwitching) return

    const nextTheme: Theme = isDark ? 'light' : 'dark'

    setIsSwitching(true)

    document.cookie = `${themeCookieName}=${nextTheme}; path=/; max-age=31536000; SameSite=Lax`
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')

    router.refresh()

    window.setTimeout(() => {
      setIsSwitching(false)
    }, 700)
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      disabled={isSwitching}
      aria-label={labels.toggle}
      title={isDark ? labels.light : labels.dark}
    >
      {isSwitching ? (
        <Cog className="h-4 w-4 animate-spin" />
      ) : isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}