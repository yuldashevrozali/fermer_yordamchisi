"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Languages } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(language === "en" ? "uz" : "en")}
      title={language === "en" ? "Switch to Uzbek" : "Switch to English"}
    >
      <Languages className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}
