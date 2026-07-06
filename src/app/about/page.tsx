import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-muted/50 px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-3xl border bg-background p-8 shadow-sm md:p-10">
          <p className="w-fit rounded-full border bg-muted px-3 py-1 text-sm text-muted-foreground">
            Sobre FUTCON
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">
            Una plataforma creada per apropar oportunitats dins del futbol amateur.
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">
            FUTCON neix com un projecte acadèmic amb una ambició molt concreta:
            facilitar que clubs, jugadors, entrenadors i professionals vinculats
            al futbol amateur puguin trobar-se, contactar i generar confiança en
            un entorn digital més estructurat que els canals informals habituals.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <Card className="futcon-card-hover">
            <CardHeader>
              <CardTitle className="text-2xl">L’origen de la idea</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-8 text-muted-foreground">
                El futbol amateur depèn sovint de recomanacions, contactes
                personals, grups de missatgeria o cercles molt reduïts. Aquest
                funcionament pot ser útil en alguns casos, però també fa que moltes
                oportunitats quedin amagades o siguin difícils de trobar per a
                persones que no formen part d’una xarxa concreta.
              </p>

              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                FUTCON sorgeix d’aquesta necessitat: convertir un procés dispers
                i poc transparent en una experiència més clara, accessible i
                orientada a perfils reals.
              </p>
            </CardContent>
          </Card>

          <Card className="futcon-card-hover">
            <CardHeader>
              <CardTitle className="text-2xl">La motivació personal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-8 text-muted-foreground">
                El projecte ha estat impulsat per Nígel Boada en el marc del seu
                Treball Final de Grau, amb la voluntat d’aplicar coneixements de
                desenvolupament web, disseny d’experiència d’usuari, bases de
                dades, autenticació, seguretat i desplegament en un producte amb
                sentit pràctic.
              </p>

              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                L’objectiu no és només construir una aplicació funcional, sinó
                demostrar com una idea vinculada a un context proper pot evolucionar
                fins a convertir-se en un prototip complet, validable i amb
                possibilitats de creixement.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-3xl border bg-background p-8 shadow-sm md:p-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Què vol resoldre FUTCON?
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-muted/40 p-5">
              <h3 className="text-xl font-semibold">Visibilitat</h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Permetre que perfils del futbol amateur puguin mostrar la seva
                disponibilitat, experiència, ubicació, rol i informació esportiva
                en una fitxa clara.
              </p>
            </div>

            <div className="rounded-2xl border bg-muted/40 p-5">
              <h3 className="text-xl font-semibold">Connexió</h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Facilitar el primer contacte entre persones i entitats mitjançant
                un cercador privat, filtres i missatgeria interna.
              </p>
            </div>

            <div className="rounded-2xl border bg-muted/40 p-5">
              <h3 className="text-xl font-semibold">Confiança</h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Incorporar elements com valoracions, verificació, assoliments i
                avisos administratius per reforçar la credibilitat de la plataforma.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Un projecte amb mirada de producte</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-8 text-muted-foreground">
                FUTCON no s’ha plantejat únicament com una demostració tècnica.
                La plataforma incorpora una landing pública, pàgines informatives,
                perfil editable, cercador, missatgeria, valoracions, verificació,
                administració, PWA, multidioma, tema clar/fosc, assoliments i
                elements de moderació.
              </p>

              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Aquest conjunt de funcionalitats busca transmetre la sensació
                d’un producte real, coherent i preparat per ser provat per persones
                usuàries abans d’una possible evolució futura.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Objectius principals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-lg leading-8 text-muted-foreground">
                <p>
                  Crear una eina útil per centralitzar perfils del futbol amateur.
                </p>
                <p>
                  Reduir la dependència exclusiva dels contactes informals.
                </p>
                <p>
                  Fer més fàcil descobrir oportunitats segons rol, ubicació i
                  disponibilitat.
                </p>
                <p>
                  Aplicar una arquitectura moderna basada en Next.js, Supabase i
                  desplegament a Vercel.
                </p>
                <p>
                  Arribar a una versió prou completa per ser validada amb usuaris.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-3xl border bg-background p-8 text-center shadow-sm md:p-10">
          <h2 className="text-3xl font-bold tracking-tight">
            FUTCON continua evolucionant
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            El prototip actual representa una base sòlida sobre la qual es poden
            estudiar noves funcionalitats, com plans premium, millores de cerca,
            integracions de pagament en mode test o eines avançades per a clubs i
            professionals.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/register">Crear compte</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/contact-us">Contacta amb nosaltres</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}