// lib/weather.ts

export function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."))
      return
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      (error) => {
        let errorMessage = ""
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable."
            break
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out."
            break
          default:
            errorMessage = "An unknown error occurred."
            break
        }
        reject(new Error(errorMessage))
      },
      options
    )
  })
}

interface WeatherApiResponse {
  location: {
    name: string
  }
  current: {
    temp_c: number
    condition: { text: string }
    feelslike_c: number
    humidity: number
    wind_kph: number
    vis_km: number
    sunrise: string
    sunset: string
  }
  forecast: {
    forecastday: Array<{
      date: string
      day: {
        maxtemp_c: number
        mintemp_c: number
        condition: { text: string }
        avghumidity: number
      }
    }>
  }
}

export async function getWeatherData(query: string): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY
  
  // Query ni encode qilish
  const encodedQuery = encodeURIComponent(query)
  
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodedQuery}&days=3&aqi=no&alerts=no`
  )

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Weather API error: ${res.status} - ${errorText}`)
  }

  const data: WeatherApiResponse = await res.json()

  return {
    location: data.location.name,
    current: {
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      feelsLike: data.current.feelslike_c,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      visibility: data.current.vis_km,
      sunrise: data.current.sunrise,
      sunset: data.current.sunset,
    },
    forecast: data.forecast.forecastday.map((day) => ({
      date: day.date,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      condition: day.day.condition.text,
      humidity: day.day.avghumidity,
    })),
  }
}