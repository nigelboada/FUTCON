import { createClient } from '@/lib/supabase/server'
import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'
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
  if (iconKey === 'search') return '\u{1f50e}'
  if (iconKey === 'map') return '\u{1f5fa}\ufe0f'
  if (iconKey === 'cup') return '\u{1f3c6}'

  switch (iconKey) {
    case 'ball':
      return '\u26bd'
    case 'runner':
      return '\u{1f3c3}'
    case 'whistle':
      return '\u{1fa88}'
    case 'boot':
      return '\u{1f45f}'
    case 'chart':
      return '\u{1f4c8}'
    case 'search':
      return '\u{1f50e}'
    case 'map':
      return '\u{1f5fa}\ufe0f'
    case 'trophy':
      return '\u{1f3c6}'
    case 'player':
      return '\u{1f9cd}'
    case 'chat':
      return '\u{1f4ac}'
    case 'medal':
      return '\u{1f3c5}'
    case 'badge':
      return '\u2705'
    case 'cup':
      return '\u{1f3c6}'
    default:
      return '\u2b50'
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
  const m = getMessages(locale)

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
      labels={{
        title: m.achievements.popupTitle,
        viewAchievements: m.achievements.viewAchievements,
        continue: m.common.continue,
      }}
    />
  )
}
