import { redirect } from 'next/navigation'
import Link from 'next/link'
import { requestProfileVerification, updateFullProfile } from './actions'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FeedbackMessage } from '@/components/layout/feedback-message'
import { AvatarUploader } from '@/components/profiles/avatar-uploader'
import { LocationSelects } from '@/components/profiles/location-selects'
import { FootballContextFields } from '@/components/profiles/football-context-fields'
import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'
import { resolveFeedbackMessage } from '@/lib/i18n/feedback'

import { calculateProfileCompleteness } from '@/lib/profiles/completeness'

type ProfileEditPageProps = {
  searchParams: Promise<{
    error?: string
    message?: string
  }>
}

type UserRole = 'player' | 'coach' | 'club' | 'staff'

const verificationClassNames: Record<string, string> = {
  unverified: 'border-muted bg-muted text-muted-foreground',
  pending: 'border-yellow-500 bg-yellow-500/10 text-yellow-700',
  verified: 'border-green-500 bg-green-500/10 text-green-700',
  rejected: 'border-red-500 bg-red-500/10 text-red-700',
}

export default async function ProfileEditPage({
  searchParams,
}: ProfileEditPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  const locale = await getLocale()
  const m = getMessages(locale)
  const message = resolveFeedbackMessage(params.message, m.feedback)
  const errorMessage = resolveFeedbackMessage(params.error, m.feedback)

  const availabilityOptions = [
    {
      value: 'available',
      label: m.availability.available,
      description: m.profileEdit.availabilityDescriptions.available,
    },
    {
      value: 'open_to_offers',
      label: m.availability.open_to_offers,
      description: m.profileEdit.availabilityDescriptions.open_to_offers,
    },
    {
      value: 'unavailable',
      label: m.availability.unavailable,
      description: m.profileEdit.availabilityDescriptions.unavailable,
    },
  ]

  const staffTypeLabels = [
    { value: 'physiotherapist', label: m.staffKinds.physiotherapist },
    { value: 'nutritionist', label: m.staffKinds.nutritionist },
    { value: 'physical_trainer', label: m.staffKinds.physical_trainer },
    { value: 'analyst', label: m.staffKinds.analyst },
    { value: 'other', label: m.staffKinds.other },
  ]

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: roles } = await supabase
    .from('profile_roles')
    .select('role')
    .eq('profile_id', user.id)

  if (!roles || roles.length === 0) {
    redirect('/onboarding')
  }

  const primaryRole = roles[0].role as UserRole

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('display_name, bio, city, province, avatar_url, availability, verification')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    redirect('/dashboard?error=profile_load_failed')
  }

  const { data: playerProfile } =
    primaryRole === 'player'
      ? await supabase
          .from('player_profiles')
          .select(
            'position, preferred_foot, modality, category, division_level, current_club, experience_years, birth_year, height_cm'
          )
          .eq('profile_id', user.id)
          .maybeSingle()
      : { data: null }

  const { data: coachProfile } =
    primaryRole === 'coach'
      ? await supabase
          .from('coach_profiles')
          .select(
            'modality, category, division_level, current_club, experience_years, coaching_license'
          )
          .eq('profile_id', user.id)
          .maybeSingle()
      : { data: null }

  const { data: clubProfile } =
    primaryRole === 'club'
      ? await supabase
          .from('club_profiles')
          .select('club_name, modality, category, division_level, website, contact_role')
          .eq('profile_id', user.id)
          .maybeSingle()
      : { data: null }

  const { data: staffProfile } =
    primaryRole === 'staff'
      ? await supabase
          .from('staff_profiles')
          .select(
            'staff_kind, services, experience_years, price_range, works_remotely'
          )
          .eq('profile_id', user.id)
          .maybeSingle()
      : { data: null }



  const { data: ownSearchProfiles } = user
    ? await supabase
        .from('profile_search_view')
        .select('*')
        .eq('profile_id', user.id)
        .limit(1)
    : { data: null }

  const profileCompleteness = ownSearchProfiles?.[0]
    ? calculateProfileCompleteness(ownSearchProfiles[0]).percentage
    : null

  const { data: clubOptionsData } = await supabase
    .from('club_profiles')
    .select('club_name, modality, category, division_level')
    .order('club_name', { ascending: true })

  const clubOptions = clubOptionsData ?? []
  const verification = profile.verification ?? 'unverified'

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-8">
      <div className="futcon-fade-up mx-auto max-w-5xl space-y-6">
        <div>
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground underline"
          >
            {m.common.backToDashboard}
          </Link>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>{m.profileEdit.title}</CardTitle>
            <CardDescription>{m.profileEdit.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-4">
              <FeedbackMessage message={message} error={errorMessage} />
            </div>

            <AvatarUploader
              userId={user.id}
              currentAvatarUrl={profile.avatar_url}
              completeness={profileCompleteness}
              labels={{
                title: m.profileEdit.avatarTitle,
                description: m.profileEdit.avatarDescription,
                upload: m.profileEdit.avatarUpload,
                uploading: m.profileEdit.avatarUploading,
                error: m.profileEdit.avatarError,
              }}
            />

            <form action={updateFullProfile} className="space-y-10">
              <section className="space-y-4 rounded-xl border bg-background p-5">
                <div>
                  <h2 className="text-lg font-semibold">
                    {m.profileEdit.roleTitle}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {m.profileEdit.roleDescription}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">{m.dashboard.role}</Label>

                  <select
                    id="role"
                    name="role"
                    defaultValue={roles[0]?.role ?? 'player'}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="player">{m.roles.player}</option>
                    <option value="coach">{m.roles.coach}</option>
                    <option value="club">{m.roles.club}</option>
                    <option value="staff">{m.roles.staff}</option>
                  </select>
                </div>

                <div className="rounded-md border border-yellow-500/40 bg-yellow-500/10 px-3 py-2 text-sm text-yellow-700">
                  {m.profileEdit.roleWarning}
                </div>
              </section>

              <section className="space-y-5 rounded-xl border bg-background p-5">
                <div className="rounded-md border bg-background p-4">
                  <p className="text-sm text-muted-foreground">
                    {m.profileEdit.assignedRole}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {roles.map((item) => (
                      <span
                        key={item.role}
                        className="rounded-full border px-3 py-1 text-sm"
                      >
                        {item.role in m.roles
                          ? m.roles[item.role as keyof typeof m.roles]
                          : item.role}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    {m.profileEdit.commonInfo}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {m.profileEdit.commonInfoDescription}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName">
                    {m.profileEdit.displayName}
                  </Label>
                  <Input
                    id="displayName"
                    name="displayName"
                    type="text"
                    defaultValue={profile.display_name ?? ''}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">{m.profileEdit.bio}</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={profile.bio ?? ''}
                    placeholder={m.profileEdit.bioPlaceholder}
                    rows={5}
                  />
                </div>

                <LocationSelects
                  defaultProvince={profile.province}
                  defaultCity={profile.city}
                  labels={{
                    province: m.profileEdit.province,
                    city: m.profileEdit.city,
                    selectProvince: m.profileEdit.selectProvince,
                    selectCity: m.profileEdit.selectCity,
                    provinceRequired: m.profileEdit.provinceRequired,
                  }}
                />

                <div className="space-y-3">
                  <Label htmlFor="availability">
                    {m.profileEdit.availability}
                  </Label>

                  <select
                    id="availability"
                    name="availability"
                    defaultValue={profile.availability ?? 'available'}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {availabilityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <div className="space-y-2">
                    {availabilityOptions.map((option) => (
                      <p
                        key={option.value}
                        className="text-sm text-muted-foreground"
                      >
                        <strong>{option.label}:</strong> {option.description}
                      </p>
                    ))}
                  </div>
                </div>
              </section>

              {primaryRole === 'player' ? (
                <section className="space-y-5 rounded-xl border bg-background p-5">
                  <SectionIntro
                    title={m.profileEdit.playerInfo}
                    description={m.profileEdit.playerInfoDescription}
                  />

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      id="position"
                      name="position"
                      label={m.profileEdit.position}
                      defaultValue={playerProfile?.position ?? ''}
                      placeholder={m.profileEdit.placeholders.position}
                    />

                    <div className="md:col-span-2">
                      <FootballContextFields
                        locale={locale}
                        defaultModality={playerProfile?.modality}
                        defaultCategory={playerProfile?.category}
                        defaultDivision={playerProfile?.division_level}
                        defaultClub={playerProfile?.current_club}
                        clubOptions={clubOptions}
                        fieldNames={{
                          modality: 'playerModality',
                          category: 'playerCategory',
                          division: 'playerDivisionLevel',
                          club: 'playerCurrentClub',
                        }}
                        labels={{
                          modality: m.profileEdit.modality,
                          category: m.profileEdit.category,
                          division: m.profileEdit.division,
                          club: m.profileEdit.currentClub,
                          license: m.profileEdit.coachingLicense,
                          selectModality: m.profileEdit.selectModality,
                          selectCategory: m.profileEdit.selectCategory,
                          selectDivision: m.profileEdit.selectDivision,
                          selectLicense: m.profileEdit.selectLicense,
                          categoryRequired: m.profileEdit.categoryRequired,
                          manualClubPlaceholder:
                            m.profileEdit.manualClubPlaceholder,
                        }}
                      />
                    </div>

                    <Field
                      id="preferredFoot"
                      name="preferredFoot"
                      label={m.profileEdit.preferredFoot}
                      defaultValue={playerProfile?.preferred_foot ?? ''}
                      placeholder={m.profileEdit.placeholders.preferredFoot}
                    />
                    <Field
                      id="playerExperienceYears"
                      name="playerExperienceYears"
                      label={m.profileEdit.experienceYears}
                      type="number"
                      min={0}
                      defaultValue={playerProfile?.experience_years ?? 0}
                    />
                    <Field
                      id="birthYear"
                      name="birthYear"
                      label={m.profileEdit.birthYear}
                      type="number"
                      min={1950}
                      max={2020}
                      defaultValue={playerProfile?.birth_year ?? ''}
                    />
                    <Field
                      id="heightCm"
                      name="heightCm"
                      label={m.profileEdit.heightCm}
                      type="number"
                      min={100}
                      max={230}
                      defaultValue={playerProfile?.height_cm ?? ''}
                    />
                  </div>
                </section>
              ) : null}

              {primaryRole === 'coach' ? (
                <section className="space-y-5 rounded-xl border bg-background p-5">
                  <SectionIntro
                    title={m.profileEdit.coachInfo}
                    description={m.profileEdit.coachInfoDescription}
                  />

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <FootballContextFields
                        locale={locale}
                        defaultModality={coachProfile?.modality}
                        defaultCategory={coachProfile?.category}
                        defaultDivision={coachProfile?.division_level}
                        defaultClub={coachProfile?.current_club}
                        defaultLicense={coachProfile?.coaching_license}
                        clubOptions={clubOptions}
                        showLicense
                        fieldNames={{
                          modality: 'coachModality',
                          category: 'coachCategory',
                          division: 'coachDivisionLevel',
                          club: 'coachCurrentClub',
                          license: 'coachingLicense',
                        }}
                        labels={{
                          modality: m.profileEdit.modality,
                          category: m.profileEdit.category,
                          division: m.profileEdit.division,
                          club: m.profileEdit.currentClub,
                          license: m.profileEdit.coachingLicense,
                          selectModality: m.profileEdit.selectModality,
                          selectCategory: m.profileEdit.selectCategory,
                          selectDivision: m.profileEdit.selectDivision,
                          selectLicense: m.profileEdit.selectLicense,
                          categoryRequired: m.profileEdit.categoryRequired,
                          manualClubPlaceholder:
                            m.profileEdit.manualClubPlaceholder,
                        }}
                      />
                    </div>

                    <Field
                      id="coachExperienceYears"
                      name="coachExperienceYears"
                      label={m.profileEdit.experienceYears}
                      type="number"
                      min={0}
                      defaultValue={coachProfile?.experience_years ?? 0}
                    />
                  </div>
                </section>
              ) : null}

              {primaryRole === 'club' ? (
                <section className="space-y-5 rounded-xl border bg-background p-5">
                  <SectionIntro
                    title={m.profileEdit.clubInfo}
                    description={m.profileEdit.clubInfoDescription}
                  />

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <FootballContextFields
                        locale={locale}
                        defaultModality={clubProfile?.modality}
                        defaultCategory={clubProfile?.category}
                        defaultDivision={clubProfile?.division_level}
                        defaultClub={clubProfile?.club_name}
                        clubOptions={clubOptions}
                        fieldNames={{
                          modality: 'clubModality',
                          category: 'clubCategory',
                          division: 'clubDivisionLevel',
                          club: 'clubName',
                        }}
                        labels={{
                          modality: m.profileEdit.modality,
                          category: m.profileEdit.category,
                          division: m.profileEdit.division,
                          club: m.profileEdit.clubName,
                          license: m.profileEdit.coachingLicense,
                          selectModality: m.profileEdit.selectModality,
                          selectCategory: m.profileEdit.selectCategory,
                          selectDivision: m.profileEdit.selectDivision,
                          selectLicense: m.profileEdit.selectLicense,
                          categoryRequired: m.profileEdit.categoryRequired,
                          manualClubPlaceholder:
                            m.profileEdit.manualClubPlaceholder,
                        }}
                      />
                    </div>

                    <Field
                      id="website"
                      name="website"
                      label={m.profileEdit.website}
                      type="url"
                      defaultValue={clubProfile?.website ?? ''}
                      placeholder={m.profileEdit.placeholders.website}
                    />
                    <Field
                      id="contactRole"
                      name="contactRole"
                      label={m.profileEdit.contactRole}
                      defaultValue={clubProfile?.contact_role ?? ''}
                      placeholder={m.profileEdit.placeholders.contactRole}
                    />
                  </div>
                </section>
              ) : null}

              {primaryRole === 'staff' ? (
                <section className="space-y-5 rounded-xl border bg-background p-5">
                  <SectionIntro
                    title={m.profileEdit.staffInfo}
                    description={m.profileEdit.staffInfoDescription}
                  />

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="staffKind">
                        {m.profileEdit.staffKind}
                      </Label>
                      <select
                        id="staffKind"
                        name="staffKind"
                        defaultValue={
                          staffProfile?.staff_kind ?? 'physiotherapist'
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                      >
                        {staffTypeLabels.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Field
                      id="staffExperienceYears"
                      name="staffExperienceYears"
                      label={m.profileEdit.experienceYears}
                      type="number"
                      min={0}
                      defaultValue={staffProfile?.experience_years ?? 0}
                    />
                    <Field
                      id="priceRange"
                      name="priceRange"
                      label={m.profileEdit.priceRange}
                      defaultValue={staffProfile?.price_range ?? ''}
                      placeholder={m.profileEdit.placeholders.priceRange}
                    />

                    <div className="flex items-center gap-2 pt-7">
                      <input
                        id="worksRemotely"
                        name="worksRemotely"
                        type="checkbox"
                        defaultChecked={staffProfile?.works_remotely ?? false}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="worksRemotely">
                        {m.profileEdit.worksRemotely}
                      </Label>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="services">
                        {m.profileEdit.services}
                      </Label>
                      <Textarea
                        id="services"
                        name="services"
                        defaultValue={staffProfile?.services ?? ''}
                        placeholder={m.profileEdit.placeholders.services}
                        rows={4}
                      />
                    </div>
                  </div>
                </section>
              ) : null}

              <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row">
                <Button type="submit">{m.common.saveChanges}</Button>

                <Button asChild variant="outline">
                  <Link href="/dashboard">{m.common.cancel}</Link>
                </Button>
              </div>
            </form>

            <section className="mt-8 space-y-4 rounded-xl border bg-background p-5">
              <SectionIntro
                title={m.profileEdit.verificationTitle}
                description={m.profileEdit.verificationDescription}
              />

              <div className="rounded-md border bg-background p-4">
                <p className="text-sm text-muted-foreground">
                  {m.profileEdit.currentStatus}
                </p>

                <span
                  className={`mt-2 inline-flex rounded-full border px-3 py-1 text-sm font-medium ${
                    verificationClassNames[verification]
                  }`}
                >
                  {m.verification[verification as keyof typeof m.verification] ??
                    verification}
                </span>

                <p className="mt-3 text-sm text-muted-foreground">
                  {m.profileEdit.verificationDescriptions[
                    verification as keyof typeof m.profileEdit.verificationDescriptions
                  ] ?? verification}
                </p>
              </div>

              {profile.verification === 'verified' ? (
                <div className="rounded-md border bg-green-500/10 p-4 text-sm text-green-700">
                  {m.profileEdit.alreadyVerified}
                </div>
              ) : profile.verification === 'pending' ? (
                <div className="rounded-md border bg-yellow-500/10 p-4 text-sm text-yellow-700">
                  {m.profileEdit.verificationPending}
                </div>
              ) : (
                <form
                  action={requestProfileVerification}
                  className="space-y-3 rounded-md border bg-background p-4"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="requestMessage"
                      className="text-sm font-medium"
                    >
                      {m.profileEdit.optionalMessage}
                    </label>

                    <textarea
                      id="requestMessage"
                      name="requestMessage"
                      rows={3}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder={m.profileEdit.requestPlaceholder}
                    />
                  </div>

                  <Button type="submit">
                    {m.profileEdit.requestVerification}
                  </Button>
                </form>
              )}
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function SectionIntro({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function Field({
  id,
  name,
  label,
  defaultValue,
  placeholder,
  type = 'text',
  min,
  max,
  required,
  className,
}: {
  id: string
  name: string
  label: string
  defaultValue: string | number
  placeholder?: string
  type?: string
  min?: number
  max?: number
  required?: boolean
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className ?? ''}`}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        min={min}
        max={max}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}
