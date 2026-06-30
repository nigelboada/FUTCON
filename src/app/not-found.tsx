import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'

export default async function NotFoundPage() {
  const locale = await getLocale()
  const m = getMessages(locale)

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{m.notFound.title}</CardTitle>
          <CardDescription>{m.notFound.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <Button asChild className="w-full">
            <Link href="/search">{m.notFound.action}</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
