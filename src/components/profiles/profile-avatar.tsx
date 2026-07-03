import type { CSSProperties } from 'react'

type ProfileAvatarProps = {
  src?: string | null
  name: string
  completeness?: number | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClassNames = {
  sm: 'h-9 w-9 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-20 w-20 text-xl',
  xl: 'h-24 w-24 text-2xl',
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'FC'
}

function getCompletenessColor(value: number) {
  if (value < 40) return '#ef4444'
  if (value < 75) return '#f59e0b'
  return '#22c55e'
}

export function ProfileAvatar({
  src,
  name,
  completeness,
  size = 'md',
  className = '',
}: ProfileAvatarProps) {
  const percentage =
    typeof completeness === 'number'
      ? Math.max(0, Math.min(100, completeness))
      : null

  const degrees = percentage !== null ? percentage * 3.6 : 0

  const style =
    percentage !== null
      ? ({
          '--avatar-degrees': `${degrees}deg`,
          '--avatar-color': getCompletenessColor(percentage),
        } as CSSProperties)
      : undefined

  return (
    <div
      className={`rounded-full p-[2px] ${className}`}
      style={
        percentage !== null
          ? {
              ...style,
              background:
                'conic-gradient(var(--avatar-color) 0deg var(--avatar-degrees), hsl(var(--muted)) var(--avatar-degrees) 360deg)',
            }
          : undefined
      }
    >
      <div
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted ${sizeClassNames[size]}`}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-bold text-muted-foreground">
            {getInitials(name)}
          </span>
        )}
      </div>
    </div>
  )
}
