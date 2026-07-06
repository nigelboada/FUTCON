import { createClient } from '@/lib/supabase/server'
import { getLocale } from '@/lib/i18n/server'
import { AchievementPopup } from './achievement-popup'

type PopupAchievement = {
  code: string
  title_ca: string
  title_es: string
  title_en: string
  description_ca: string
  description_es: string
  description_en: string
  icon_key: string
}

function iconFromKey(iconKey: string) {
  if (iconKey === 'search') return '🔎'
  if (iconKey === 'map') return '🗺️'
  if (iconKey === 'cup') return '🏆'

  switch (iconKey) {
    case 'ball':
      return '⚽'
    case 'runner':
      return '🏃‍♀️'
    case 'whistle':
      return '🪈'
    case 'boot':
      return '👟'
    case 'chart':
      return '📈'
    case 'search':
      return '🔎'
    case 'map':
      return '🗺️'
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

function getJoinedAchievement(
  achievement: PopupAchievement | PopupAchievement[] | null
) {
  if (Array.isArray(achievement)) {
    return achievement[0] ?? null
  }

  return achievement
}

export async function AchievementPopupGate() {
  const supabase = await createClient()
  const locale = await getLocale()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data } = await supabase
    .from('user_achievements')
    .select(
      `
        id,
        achievement:achievements (
          code,
          title_ca,
          title_es,
          title_en,
          description_ca,
          description_es,
          description_en,
          icon_key
        )
      `
    )
    .eq('profile_id', user.id)
    .is('seen_at', null)
    .order('unlocked_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!data || !data.achievement) {
    return null
  }

  const achievement = getJoinedAchievement(data.achievement)

  if (!achievement) {
    return null
  }

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
      userAchievementId={data.id}
      title={title}
      description={description}
      icon={iconFromKey(achievement.icon_key)}
    />
  )
}
