import Link from 'next/link'
import { getLocale } from '@/lib/i18n/server'
import { getFooterContent } from '@/lib/footer/content'

import Image from 'next/image'

export async function AppFooter() {
  const locale = await getLocale()
  const content = getFooterContent(locale)

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_2fr]">
        <div className="space-y-3">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border bg-background">
              <Image
                src="/icons/icon-192.png"
                alt="FUTCON"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="text-lg font-bold">FUTCON</span>
          </Link>

          <p className="max-w-sm text-sm text-background/75">
            {content.description}
          </p>

          <p className="text-xs text-background/60">{content.meta}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {content.columns.map((column) => (
            <div key={column.title}>
              <h2 className="font-semibold">{column.title}</h2>

              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 transition hover:text-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-background/15 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-background/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{content.copyright}</p>
          <p>Igualada / Anoia · 2026</p>
        </div>
      </div>
    </footer>
  )
}