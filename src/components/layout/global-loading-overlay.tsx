'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function GlobalLoadingOverlay() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  function startLoading() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    setIsVisible(true)

    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false)
    }, 8000)
  }

  useEffect(() => {
    const hideTimeout = window.setTimeout(() => {
      setIsVisible(false)
    }, 0)

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    return () => {
      window.clearTimeout(hideTimeout)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a[href]') as HTMLAnchorElement | null

      if (!anchor) return
      if (anchor.target === '_blank') return
      if (anchor.hasAttribute('download')) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const url = new URL(anchor.href)

      if (url.origin !== window.location.origin) return
      if (url.href === window.location.href) return

      startLoading()
    }

    function handleSubmit(event: SubmitEvent) {
      const form = event.target as HTMLFormElement | null

      if (!form) return
      if (form.dataset.noLoading === 'true') return

      startLoading()
    }

    function handleGlobalLoadingEvent() {
      startLoading()
    }

    document.addEventListener('click', handleClick, true)
    document.addEventListener('submit', handleSubmit, true)
    window.addEventListener('futcon:start-loading', handleGlobalLoadingEvent)

    return () => {
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('submit', handleSubmit, true)
      window.removeEventListener(
        'futcon:start-loading',
        handleGlobalLoadingEvent
      )

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/65 backdrop-blur-[2px]">
      <div className="flex flex-col items-center gap-3">
        <div className="futcon-ball-loader">⚽</div>
        <div className="h-px w-36 bg-black" />
      </div>
    </div>
  )
}
