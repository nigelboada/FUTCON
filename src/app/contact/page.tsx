import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'
import { resolveFeedbackMessage } from '@/lib/i18n/feedback'
import { getPublicSiteContent } from '@/lib/public-site/content'
import { submitContactMessage } from './actions'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FeedbackMessage } from '@/components/layout/feedback-message'

type ContactPageProps = {
  searchParams: Promise<{
    message?: string
    error?: string
  }>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams
  const locale = await getLocale()
  const m = getMessages(locale)
  const content = getPublicSiteContent(locale)
  const message = resolveFeedbackMessage(params.message, m.feedback)
  const error = resolveFeedbackMessage(params.error, m.feedback)

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-12">
      <div className="futcon-fade-up mx-auto max-w-3xl">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-3xl">{content.contact.title}</CardTitle>
            <CardDescription>{content.contact.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <FeedbackMessage message={message} error={error} />

            <form action={submitContactMessage} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{content.contact.name}</Label>
                <Input id="name" name="name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{content.contact.email}</Label>
                <Input id="email" name="email" type="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">{content.contact.subject}</Label>
                <Input id="subject" name="subject" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{content.contact.message}</Label>
                <Textarea id="message" name="message" rows={6} required />
              </div>

              <Button type="submit">{content.contact.submit}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}