type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="space-y-2">
      {eyebrow ? (
        <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
      ) : null}

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h1>

      {description ? (
        <p className="max-w-2xl text-muted-foreground">{description}</p>
      ) : null}
    </section>
  )
}