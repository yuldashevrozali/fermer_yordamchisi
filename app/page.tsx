import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeatureCards } from "@/components/feature-cards"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeatureCards />
      </main>
    </div>
  )
}
