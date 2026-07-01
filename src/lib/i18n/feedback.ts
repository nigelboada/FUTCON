export function resolveFeedbackMessage(
  value: string | undefined,
  feedback: Record<string, string>
) {
  if (!value) {
    return undefined
  }

  return feedback[value as keyof typeof feedback] ?? value
}
