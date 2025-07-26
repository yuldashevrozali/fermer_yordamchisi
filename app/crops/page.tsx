import { Header } from "@/components/header"
import { CropInfo } from "@/components/crop-info"

export default function CropsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Crop Information</h1>
          <CropInfo />
        </div>
      </main>
    </div>
  )
}
