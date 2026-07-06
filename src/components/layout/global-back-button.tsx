'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function GlobalBackButton() {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === '/') return null

  function goBack() {
    if (
      document.referrer &&
      new URL(document.referrer).origin === window.location.origin
    ) {
      router.back()
      return
    }

    router.push('/')
  }

  return (
    <div className="border-b bg-background/80 px-4 py-2 backdrop-blur">
      <div className="mx-auto flex max-w-7xl justify-start">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={goBack}
          className="transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-sm"
        >
          Tornar
        </Button>
      </div>
    </div>
  )
}
