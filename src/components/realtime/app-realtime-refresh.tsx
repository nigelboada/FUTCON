'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type AppRealtimeRefreshProps = {
  userId: string
}

export function AppRealtimeRefresh({ userId }: AppRealtimeRefreshProps) {
  const router = useRouter()
  const timeoutRef = useRef<number | null>(null)

  const scheduleRefresh = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      router.refresh()
    }, 250)
  }, [router])

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel(`app-realtime:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        () => {
          scheduleRefresh()
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversation_participants',
          filter: `profile_id=eq.${userId}`,
        },
        () => {
          scheduleRefresh()
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_warnings',
          filter: `profile_id=eq.${userId}`,
        },
        () => {
          scheduleRefresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [scheduleRefresh, userId])

  return null
}
