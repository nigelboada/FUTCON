type ProfileAvatarProps = {
  src?: string | null
  name: string
  completeness?: number | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showCompletionRing?: boolean
  showCompletedBadge?: boolean
}

const avatarSizes = {
  sm: { wrapper: 40, image: 34, text: 'text-xs', badge: 'h-4 w-4' },
  md: { wrapper: 52, image: 44, text: 'text-sm', badge: 'h-5 w-5' },
  lg: { wrapper: 88, image: 76, text: 'text-xl', badge: 'h-6 w-6' },
  xl: { wrapper: 112, image: 96, text: 'text-2xl', badge: 'h-7 w-7' },
}

function getInitials(name: string) {
  return (
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'FC'
  )
}

function getRingColor(percentage: number) {
  if (percentage >= 100) {
    return '#0ea5e9'
  }

  return '#7dd3fc'
}

export function ProfileAvatar({
  src,
  name,
  completeness,
  size = 'md',
  className = '',
  showCompletionRing = true,
  showCompletedBadge = true,
}: ProfileAvatarProps) {
  const config = avatarSizes[size]
  const percentage =
    typeof completeness === 'number'
      ? Math.max(0, Math.min(100, completeness))
      : 0

  const strokeWidth = 4
  const radius = (config.wrapper - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset =
    circumference - (percentage / 100) * circumference

  const hasCompleted = percentage >= 100
  const ringColor = getRingColor(percentage)

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: config.wrapper, height: config.wrapper }}
    >
      {showCompletionRing ? (
        <svg
          className="absolute inset-0 -rotate-90"
          width={config.wrapper}
          height={config.wrapper}
          viewBox={`0 0 ${config.wrapper} ${config.wrapper}`}
          aria-hidden="true"
        >
          <circle
            cx={config.wrapper / 2}
            cy={config.wrapper / 2}
            r={radius}
            fill="none"
            stroke="rgba(148, 163, 184, 0.25)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={config.wrapper / 2}
            cy={config.wrapper / 2}
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 300ms ease, stroke 300ms ease' }}
          />
        </svg>
      ) : null}

      <div
        className="relative z-10 overflow-hidden rounded-full border bg-muted"
        style={{ width: config.image, height: config.image }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className={`font-bold text-muted-foreground ${config.text}`}>
              {getInitials(name)}
            </span>
          </div>
        )}
      </div>

      {showCompletedBadge && hasCompleted ? (
        <div className="absolute bottom-0 right-0 z-20">
          <div
            className={`flex items-center justify-center rounded-full border-2 border-background bg-sky-500 text-white shadow ${config.badge}`}
            title="Perfil complet"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12l4 4L19 7" />
            </svg>
          </div>
        </div>
      ) : null}
    </div>
  )
}