'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

import { ProfileAvatar } from '@/components/profiles/profile-avatar'
import { awardAvatarUploaded } from '@/app/profile/edit/actions'
import { CompletenessFieldBadge } from '@/components/profiles/completeness-field-badge'

type AvatarUploaderProps = {
  userId: string
  displayName: string | null
  currentAvatarUrl: string | null
  completeness: number | null
  completenessValue?: number
  labels: {
    title: string
    description: string
    upload: string
    uploading: string
    error: string
  }
}

function getFileExtension(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase()

  if (extension === 'jpg' || extension === 'jpeg') {
    return 'jpg'
  }

  if (extension === 'png') {
    return 'png'
  }

  if (extension === 'webp') {
    return 'webp'
  }

  return 'png'
}

// function getInitials(value: string) {
//   return value.slice(0, 2).toUpperCase()
// }

export function AvatarUploader({
  userId,
  displayName,
  completeness,
  completenessValue,
  currentAvatarUrl,
  labels,
}: AvatarUploaderProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const supabase = createClient()

  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function uploadAvatar(file: File) {
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      setError(labels.error)
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError(labels.error)
      return
    }

    setIsUploading(true)
    setError(null)

    const extension = getFileExtension(file)
    const path = `${userId}/avatar-${Date.now()}.${extension}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, file, {
        cacheControl: '3600',
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      setError(uploadError.message)
      setIsUploading(false)
      return
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(path)

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        avatar_url: data.publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (updateError) {
      setError(updateError.message)
      setIsUploading(false)
      return
    }

    await supabase.rpc('award_achievement', {
      achievement_code: 'avatar_uploaded',
      target_profile_id: userId,
    })

    setPreviewUrl(data.publicUrl)
    await awardAvatarUploaded()
    setIsUploading(false)
    router.refresh()
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    uploadAvatar(file)
  }

  return (
    <section
      id="profile-avatar"
      className="space-y-4 rounded-xl border bg-background p-5"
    >
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{labels.title}</h2>
          {typeof completenessValue === 'number' && completenessValue > 0 ? (
            <CompletenessFieldBadge value={completenessValue} />
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground">{labels.description}</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted">
          <ProfileAvatar
            src={previewUrl}
            name={displayName ?? 'FUTCON'}
            completeness={completeness}
            size="xl"
            showCompletedBadge={false}
          />
        </div>

        <div className="space-y-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? labels.uploading : labels.upload}
          </Button>

          <p className="text-xs text-muted-foreground">
            PNG, JPG o WEBP. Mida màxima: 2 MB.
          </p>

          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
