// lib/types.ts

export interface WeatherData {
  location: string
  current: {
    temperature: number
    condition: string
    feelsLike: number
    humidity: number
    windSpeed: number
    visibility: number
    sunrise: string
    sunset: string
  }
  forecast: Array<{
    date: string
    maxTemp: number
    minTemp: number
    condition: string
    humidity: number
  }>
}

export interface Coordinates {
  lat: number
  lon: number
}
