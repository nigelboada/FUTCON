import type { SupabaseClient, User } from '@supabase/supabase-js'

type AuthProfile = {
  is_banned: boolean | null
}

function getDisplayName(user: User) {
  const metadataName =
    typeof user.user_metadata?.display_name === 'string'
      ? user.user_metadata.display_name
      : typeof user.user_metadata?.name === 'string'
        ? user.user_metadata.name
        : ''

  const fallbackName = user.email?.split('@')[0] ?? 'Usuari'

  return (metadataName || fallbackName).trim()
}

export async function ensureUserProfile(
  supabase: SupabaseClient,
  user: User
) {
  const { data: existingProfile, error: profileLoadError } = await supabase
    .from('profiles')
    .select('is_banned')
    .eq('id', user.id)
    .maybeSingle<AuthProfile>()

  if (profileLoadError) {
    return { profile: null, error: profileLoadError }
  }

  if (existingProfile) {
    return { profile: existingProfile, error: null }
  }

  const { data: createdProfile, error: profileCreateError } = await supabase
    .from('profiles')
    .upsert(
      {
        id: user.id,
        display_name: getDisplayName(user),
      },
      {
        onConflict: 'id',
        ignoreDuplicates: true,
      }
    )
    .select('is_banned')
    .single<AuthProfile>()

  return {
    profile: createdProfile,
    error: profileCreateError,
  }
}
