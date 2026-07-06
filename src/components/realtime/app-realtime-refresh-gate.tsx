import { createClient } from '@/lib/supabase/server'
import { AppRealtimeRefresh } from './app-realtime-refresh'

export async function AppRealtimeRefreshGate() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  return <AppRealtimeRefresh userId={user.id} />
}
