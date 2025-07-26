"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { Sprout, Cloud, CheckSquare, TrendingUp } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Welcome to Fermer Assistant",
      subtitle: "Your complete farming companion for managing tasks, tracking weather, and monitoring crop prices",
      description:
        "Streamline your farming operations with our comprehensive tools designed specifically for modern farmers.",
      getStarted: "Get Started",
      features: [
        { icon: Cloud, title: "Weather Tracking", desc: "Real-time weather updates and forecasts" },
        { icon: CheckSquare, title: "Task Management", desc: "Organize and track your daily farming tasks" },
        { icon: Sprout, title: "Crop Information", desc: "Detailed information about various crops" },
        { icon: TrendingUp, title: "Market Prices", desc: "Stay updated with current market prices" },
      ],
    },
    uz: {
      title: "Fermer Assistant ga xush kelibsiz",
      subtitle:
        "Vazifalarni boshqarish, ob-havoni kuzatish va ekin narxlarini monitoring qilish uchun to'liq fermer yordamchisi",
      description:
        "Zamonaviy fermerlar uchun maxsus ishlab chiqilgan keng qamrovli vositalar bilan fermer faoliyatingizni soddalashtiring.",
      getStarted: "Boshlash",
      features: [
        { icon: Cloud, title: "Ob-havo kuzatuvi", desc: "Real vaqtda ob-havo yangilanishlari va prognozlar" },
        {
          icon: CheckSquare,
          title: "Vazifalar boshqaruvi",
          desc: "Kundalik fermer vazifalarini tartibga solish va kuzatish",
        },
        { icon: Sprout, title: "Ekin ma'lumotlari", desc: "Turli ekinlar haqida batafsil ma'lumot" },
        { icon: TrendingUp, title: "Bozor narxlari", desc: "Joriy bozor narxlari bilan yangilanib turing" },
      ],
    },
  }

  const t = content[language]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">{t.subtitle}</p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{t.description}</p>
          <Link href="/weather">
            <Button size="lg" className="text-lg px-8 py-6">
              {t.getStarted}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
