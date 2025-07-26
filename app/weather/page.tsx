import { Header } from "@/components/header"
import { WeatherWidget } from "@/components/weather-widget"

export default function WeatherPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Weather Forecast</h1>
          <WeatherWidget />
        </div>
      </main>
    </div>
  )
}
