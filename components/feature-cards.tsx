"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Cloud, CheckSquare, Sprout, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

export function FeatureCards() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Everything you need to manage your farm",
      cards: [
        {
          icon: Cloud,
          title: "Weather Forecast",
          description: "Get accurate weather predictions to plan your farming activities effectively.",
          href: "/weather",
          buttonText: "Check Weather",
        },
        {
          icon: CheckSquare,
          title: "Task Management",
          description: "Keep track of your daily farming tasks and never miss important activities.",
          href: "/tasks",
          buttonText: "Manage Tasks",
        },
        {
          icon: Sprout,
          title: "Crop Information",
          description: "Access detailed information about different crops, growing seasons, and care tips.",
          href: "/crops",
          buttonText: "View Crops",
        },
        {
          icon: TrendingUp,
          title: "Market Prices",
          description: "Stay updated with current market prices to make informed selling decisions.",
          href: "/market",
          buttonText: "View Prices",
        },
      ],
    },
    uz: {
      title: "Fermangizni boshqarish uchun kerak bo'lgan hamma narsa",
      cards: [
        {
          icon: Cloud,
          title: "Ob-havo prognozi",
          description: "Fermer faoliyatingizni samarali rejalashtirish uchun aniq ob-havo prognozlarini oling.",
          href: "/weather",
          buttonText: "Ob-havoni tekshirish",
        },
        {
          icon: CheckSquare,
          title: "Vazifalar boshqaruvi",
          description: "Kundalik fermer vazifalaringizni kuzatib boring va muhim ishlarni o'tkazib yubormang.",
          href: "/tasks",
          buttonText: "Vazifalarni boshqarish",
        },
        {
          icon: Sprout,
          title: "Ekin ma'lumotlari",
          description: "Turli ekinlar, o'sish mavsumi va parvarish bo'yicha batafsil ma'lumotlarga ega bo'ling.",
          href: "/crops",
          buttonText: "Ekinlarni ko'rish",
        },
        {
          icon: TrendingUp,
          title: "Bozor narxlari",
          description: "Ongli sotish qarorlarini qabul qilish uchun joriy bozor narxlari bilan yangilanib turing.",
          href: "/market",
          buttonText: "Narxlarni ko'rish",
        },
      ],
    },
  }

  const t = content[language]

  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.cards.map((card, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <card.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6">{card.description}</CardDescription>
                <Link href={card.href}>
                  <Button className="w-full group">
                    {card.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
