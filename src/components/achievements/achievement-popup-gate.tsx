import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { getLocale } from '@/lib/i18n/server'
import { AchievementPopup } from './achievement-popup'

function iconFromKey(iconKey: string) {
  switch (iconKey) {
    case 'ball':
      return '⚽'
    case 'whistle':
      return '🪈'
    case 'boot':
      return '👟'
    case 'trophy':
      return '🏆'
    case 'player':
      return '🧍'
    case 'chat':
      return '💬'
    case 'medal':
      return '🏅'
    case 'badge':
      return '✅'
    case 'cup':
      return '🏆'
    default:
      return '⭐'
  }
}

export async function AchievementPopupGate() {
  const cookieStore = await cookies()
  const code = cookieStore.get('futcon_achievement_popup')?.value

  if (!code) return null

  const locale = await getLocale()
  const supabase = await createClient()

  const { data: achievement } = await supabase
    .from('achievements')
    .select('*')
    .eq('code', code)
    .maybeSingle()

  if (!achievement) return null

  const title =
    locale === 'es'
      ? achievement.title_es
      : locale === 'en'
      ? achievement.title_en
      : achievement.title_ca

  const description =
    locale === 'es'
      ? achievement.description_es
      : locale === 'en'
      ? achievement.description_en
      : achievement.description_ca

  return (
    <AchievementPopup
      title={title}
      description={description}
      icon={iconFromKey(achievement.icon_key)}
    />
  )
}