"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { Sprout, Droplets, Calendar, AlertTriangle, Thermometer } from "lucide-react"
import { cropData } from "@/lib/crop-data"

export function CropInfo() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Crop Information",
      description: "Detailed information about various crops and their requirements",
      growingSeason: "Growing Season",
      wateringNeeds: "Watering Needs",
      temperature: "Temperature Range",
      commonDiseases: "Common Diseases",
      tips: "Growing Tips",
    },
    uz: {
      title: "Ekin ma'lumotlari",
      description: "Turli ekinlar va ularning talablari haqida batafsil ma'lumot",
      growingSeason: "O'sish mavsumi",
      wateringNeeds: "Sug'orish talabi",
      temperature: "Harorat oralig'i",
      commonDiseases: "Keng tarqalgan kasalliklar",
      tips: "O'stirish maslahatlari",
    },
  }

  const t = content[language]
  const crops = cropData[language]

  const getWateringColor = (level: string) => {
    switch (level) {
      case "High":
      case "Yuqori":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Medium":
      case "O'rta":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Low":
      case "Past":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{crop.name}</CardTitle>
                <div className="text-2xl">{crop.icon}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">{t.growingSeason}:</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">{crop.growingSeason}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">{t.wateringNeeds}:</span>
                  <Badge className={getWateringColor(crop.wateringNeeds)}>{crop.wateringNeeds}</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">{t.temperature}:</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">{crop.temperature}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">{t.commonDiseases}:</span>
                </div>
                <div className="ml-6 space-y-1">
                  {crop.commonDiseases.map((disease, idx) => (
                    <Badge key={idx} variant="outline" className="mr-1 mb-1">
                      {disease}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">{t.tips}:</span>
                </div>
                <ul className="text-sm text-muted-foreground ml-6 space-y-1">
                  {crop.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
