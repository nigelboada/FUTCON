'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

type AvatarUploaderProps = {
  userId: string
  currentAvatarUrl: string | null
  labels: {
    title: string
    description: string
    upload: string
    uploading: string
    error: string
  }
}

export function AvatarUploader({
  userId,
  currentAvatarUrl,
  labels,
}: AvatarUploaderProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

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

    const extension = file.name.split('.').pop() ?? 'png'
    const path = `${userId}/avatar.${extension}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, file, {
        upsert: true,
        contentType: file.type,
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

    setIsUploading(false)
    router.refresh()
  }

  return (
    <section className="space-y-4 rounded-xl border bg-background p-5">
      <div>
        <h2 className="text-lg font-semibold">{labels.title}</h2>
        <p className="text-sm text-muted-foreground">{labels.description}</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border bg-muted">
          {currentAvatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentAvatarUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-muted-foreground">
              FUT
            </span>
          )}
        </div>

        <div className="space-y-3">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleChange}
            disabled={isUploading}
          />

          <Button type="button" variant="outline" disabled>
            {isUploading ? labels.uploading : labels.upload}
          </Button>

          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : null}
        </div>
      </div>
    </section>
  )
}