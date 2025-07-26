"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "@/lib/firebase" // firebase config fayling

type AuthFormProps = {
  type: "signin" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
  const auth = getAuth(app)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (type === "signup") {
        await createUserWithEmailAndPassword(auth, email, password)
        toast.success("Ro'yhatdan muvaffaqiyatli o'tdingiz!")
        router.push("/")
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("Tizimga muvaffaqiyatli kirdingiz!")
        router.push("/")
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-20">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="password">Parol</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full">
        {type === "signup" ? "Ro‘yxatdan o‘tish" : "Kirish"}
      </Button>
    </form>
  )
}
