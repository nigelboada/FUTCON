import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Perfil no trobat</CardTitle>
          <CardDescription>
            El perfil que estàs intentant consultar no existeix o no és públic.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button asChild className="w-full">
            <Link href="/search">Tornar al cercador</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}