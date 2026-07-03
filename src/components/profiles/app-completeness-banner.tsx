import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'
import { calculateProfileCompleteness } from '@/lib/profiles/completeness'
import { ProfileCompletenessBanner } from './profile-completeness-banner'

export async function AppCompletenessBanner() {
  const supabase = await createClient()
  const locale = await getLocale()
  const m = getMessages(locale)
  const cookieStore = await cookies()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  if (cookieStore.get('futcon-completeness-dismissed')?.value === user.id) {
    return null
  }

  const { data } = await supabase
    .from('profile_search_view')
    .select('*')
    .eq('profile_id', user.id)
    .limit(1)

  const profile = data?.[0]

  if (!profile) {
    return null
  }

  const completeness = calculateProfileCompleteness(profile)

  if (completeness.percentage >= 100) {
    return null
  }

  return (
    <ProfileCompletenessBanner
      userId={user.id}
      percentage={completeness.percentage}
      label={m.dashboard.profileCompleteness}
      description={m.dashboard.profileCompletenessHint}
      closeLabel={m.common.close}
    />
  )
}