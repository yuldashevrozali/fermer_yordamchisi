import { Header } from "@/components/header"
import { MarketPrices } from "@/components/market-prices"

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Market Prices</h1>
          <MarketPrices />
        </div>
      </main>
    </div>
  )
}
