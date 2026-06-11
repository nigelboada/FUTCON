type FeedbackMessageProps = {
  message?: string
  error?: string
}

export function FeedbackMessage({ message, error }: FeedbackMessageProps) {
  return (
    <>
      {message ? (
        <div className="rounded-md border border-green-500/40 bg-green-500/10 px-3 py-2 text-sm text-green-700">
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      ) : null}
    </>
  )
}