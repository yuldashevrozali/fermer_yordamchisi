import type React from "react"
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/components/language-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fermer Yordamchisi – Fermerlar uchun qulay platforma",
  description: "Fermerlar uchun bepul yordamchi: mahsulot e’lon qilish, sotib olish, ob-havo, ekinlar va bozor narxlarini kuzatish bir joyda.",
  generator: "fermer-yordamchisi.vercel.app"
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            {children}
            <Analytics />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
