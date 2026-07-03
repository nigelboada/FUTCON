import { awardAchievementByCode } from './award'

export async function syncCompletenessAchievements(profileId: string, percentage: number) {
  if (percentage >= 25) {
    await awardAchievementByCode(profileId, 'profile_25')
  }

  if (percentage >= 50) {
    await awardAchievementByCode(profileId, 'profile_50')
  }

  if (percentage >= 100) {
    await awardAchievementByCode(profileId, 'profile_100')
  }
}