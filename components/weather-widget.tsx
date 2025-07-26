// components/weather-widget.tsx

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/language-provider"
import { MapPin, Droplets, Wind, Eye, Sunrise, Sunset } from "lucide-react"
import { getWeatherData, getCurrentLocation } from "@/lib/weather"
import type { WeatherData } from "@/lib/types"

export function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Weather Forecast",
      description: "Get current weather and 3-day forecast for your location",
      placeholder: "Enter city name (e.g., Tashkent)",
      getWeather: "Get Weather",
      useLocation: "Use My Location",
      current: "Current Weather",
      forecast: "3-Day Forecast",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      visibility: "Visibility",
      sunrise: "Sunrise",
      sunset: "Sunset",
      feelsLike: "Feels like",
    },
    uz: {
      title: "Ob-havo prognozi",
      description: "Joylashuvingiz uchun joriy ob-havo va 3 kunlik prognozni oling",
      placeholder: "Shahar nomini kiriting (masalan, Toshkent)",
      getWeather: "Ob-havoni olish",
      useLocation: "Mening joylashuvimni ishlatish",
      current: "Joriy ob-havo",
      forecast: "3 kunlik prognoz",
      humidity: "Namlik",
      windSpeed: "Shamol tezligi",
      visibility: "Ko'rinish",
      sunrise: "Quyosh chiqishi",
      sunset: "Quyosh botishi",
      feelsLike: "His qilinadi",
    },
  }

  const t = content[language]

  const handleGetWeather = async () => {
    if (!location.trim()) {
      toast({
        title: "Error",
        description: "Please enter a location",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const data = await getWeatherData(location)
      setWeatherData(data)
      toast({
        title: "Success",
        description: `Weather data loaded for ${data.location}`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUseCurrentLocation = async () => {
    setLoading(true)
    try {
      const coords = await getCurrentLocation()
      const query = `${coords.lat},${coords.lon}`
      const data = await getWeatherData(query)
      setWeatherData(data)
      setLocation(data.location)
      toast({
        title: "Success",
        description: `Weather data loaded for your location`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to get your location. Please enter manually.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder={t.placeholder}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGetWeather()}
              className="flex-1"
            />
            <div className="flex gap-2">
              <Button onClick={handleGetWeather} disabled={loading}>
                {loading ? "Loading..." : t.getWeather}
              </Button>
              <Button variant="outline" onClick={handleUseCurrentLocation} disabled={loading}>
                {t.useLocation}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {weatherData && (
        <>
          {/* Current Weather */}
          <Card>
            <CardHeader>
              <CardTitle>{t.current}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {weatherData.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {Math.round(weatherData.current.temperature)}°C
                  </div>
                  <div className="text-lg font-medium mb-1">{weatherData.current.condition}</div>
                  <div className="text-sm text-muted-foreground">
                    {t.feelsLike} {Math.round(weatherData.current.feelsLike)}°C
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">
                      {t.humidity}: {weatherData.current.humidity}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {t.windSpeed}: {weatherData.current.windSpeed} km/h
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {t.visibility}: {weatherData.current.visibility} km
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sunrise className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">
                      {t.sunrise}: {weatherData.current.sunrise}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sunset className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">
                      {t.sunset}: {weatherData.current.sunset}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3-Day Forecast */}
          <Card>
            <CardHeader>
              <CardTitle>{t.forecast}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-4">
                      <div className="font-medium mb-2">{day.date}</div>
                      <div className="text-2xl font-bold text-blue-600 mb-2">{Math.round(day.maxTemp)}°C</div>
                      <div className="text-sm text-muted-foreground mb-2">Min: {Math.round(day.minTemp)}°C</div>
                      <div className="text-sm">{day.condition}</div>
                      <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Droplets className="h-3 w-3" />
                        {day.humidity}%
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}