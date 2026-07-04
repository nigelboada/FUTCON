type CompletenessFieldBadgeProps = {
  value: number
}

export function CompletenessFieldBadge({ value }: CompletenessFieldBadgeProps) {
  return (
    <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-600">
      +{value}%
    </span>
  )
}