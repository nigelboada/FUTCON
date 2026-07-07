'use client'

import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

const historyKey = 'futcon-route-history'

function getCurrentPath(pathname: string, searchParams: URLSearchParams) {
  const query = searchParams.toString()
  return query ? `${pathname}?${query}` : pathname
}

function readHistory() {
  try {
    return JSON.parse(sessionStorage.getItem(historyKey) ?? '[]') as string[]
  } catch {
    return []
  }
}

function writeHistory(history: string[]) {
  sessionStorage.setItem(historyKey, JSON.stringify(history.slice(-20)))
}

type GlobalBackButtonProps = {
  label: string
}

export function GlobalBackButton({ label }: GlobalBackButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentPath = getCurrentPath(pathname, searchParams)

  useEffect(() => {
    const history = readHistory()
    const lastPath = history[history.length - 1]

    if (lastPath !== currentPath) {
      writeHistory([...history, currentPath])
    }
  }, [currentPath])

  function goBack() {
    const history = readHistory()

    if (history.length > 1) {
      history.pop()
      const previousPath = history.pop()

      writeHistory(history)

      if (previousPath) {
        router.push(previousPath)
        return
      }
    }

    router.push('/')
  }

  if (pathname === '/') {
    return null
  }

  return (
    <div className="px-4 pt-4">
      <div className="mx-auto flex max-w-7xl justify-start">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={goBack}
          className="transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-sm"
        >
          {label}
        </Button>
      </div>
    </div>
  )
}
