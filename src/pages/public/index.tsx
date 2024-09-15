import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarDays, Search, UtensilsCrossed, ChefHat } from "lucide-react"
import { Link } from "react-router-dom"

export default function PublicPage() {
  return (
    <main className="flex-grow">
      <section className="px-4 py-12 text-center bg-gradient-to-r from-primary/10 to-primary/30">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Réservez Votre Table Parfaite
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez et réservez des tables dans les meilleurs restaurants de votre région. Profitez d'expériences culinaires sans tracas avec Munch.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Input className="max-w-xs" placeholder="Entrez votre localisation" />
          <Link to="/restaurants">
            <Button size="lg" className="w-full sm:w-auto"  >
              <Search className="w-4 h-4 mr-2" />
              Trouver des Tables
            </Button>
          </Link>
        </div>
      </section>

      <section className="px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Comment Ça Marche</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <Search className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Recherchez</h3>
            <p className="text-muted-foreground">Trouvez des restaurants et des tables disponibles dans votre ville</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <CalendarDays className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Réservez</h3>
            <p className="text-muted-foreground">Choisissez votre date, heure et combien vous êtes</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <UtensilsCrossed className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Profitez</h3>
            <p className="text-muted-foreground">Dînez dans le restaurant de votre choix et profitez de votre repas</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à dîner plus intelligemment ?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Rejoignez Munch aujourd'hui et découvrez une nouvelle façon de dîner à l'extérieur.
          </p>
          <Link to="/register?account=user">
            <Button size="lg">Inscrivez-vous gratuitement</Button>
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <ChefHat className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Êtes-vous restaurateur ?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Inscrivez votre restaurant sur Munch et atteignez plus de clients. Gérez vos réservations efficacement et développez votre entreprise.
          </p>
          <Link to="/register?account=restaurant">
            <Button size="lg" variant="outline">
              Devenez partenaire
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
