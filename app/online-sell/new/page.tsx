'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Atom } from "lucide-react"
 // ← import qilish esdan chiqmasin

export default function NewProductPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", price: "", category: "", seller: "", phone: "" })
  const [image, setImage] = useState<File | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.name.trim()) newErrors.name = "Mahsulot nomi kerak"
    if (!form.price.trim()) newErrors.price = "Narxi kerak"
    if (!form.category.trim()) newErrors.category = "Kategoriya tanlanishi kerak"
    if (!form.seller.trim()) newErrors.seller = "Sotuvchi ismi kerak"
    if (!form.phone.trim()) newErrors.phone = "Telefon raqami kerak"
    if (!image) newErrors.image = "Rasm yuklash kerak"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      let imageUrl = ""

      if (image) {
        const formData = new FormData()
        formData.append("file", image)

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        const uploadData = await uploadRes.json()
        imageUrl = uploadData.secure_url
      }

      const fullData = { ...form, image: imageUrl }

      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      })

      router.push("/market")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Mahsulot qo'shish</h1>

      <div>
        <Input placeholder="Mahsulot nomi" name="name" onChange={handleChange} />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <Input placeholder="Narxi (USD)" name="price" onChange={handleChange} />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>

      <Label>Kategoriya</Label>
      <Select onValueChange={(val) => {
        setForm({ ...form, category: val })
        setErrors({ ...errors, category: "" })
      }}>
        <SelectTrigger>
          <SelectValue placeholder="Kategoriya tanlang" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Meva">Meva</SelectItem>
          <SelectItem value="Sabzovat">Sabzovat</SelectItem>
          <SelectItem value="Don mahsulotlari">Don mahsulotlari</SelectItem>
          <SelectItem value="Sut mahsulotlar">Sut mahsulotlari</SelectItem>
          <SelectItem value="Boshqa">Boshqa</SelectItem>
        </SelectContent>
      </Select>
      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}

      <div>
        <Input placeholder="Sotuvchi ismi" name="seller" onChange={handleChange} />
        {errors.seller && <p className="text-red-500 text-sm mt-1">{errors.seller}</p>}
      </div>

      <div>
        <Input placeholder="Telefon raqami" name="phone" onChange={handleChange} />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <Label>Rasm yuklash</Label>
      <Input type="file" accept="image/*" onChange={handleImageChange} />
      {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

      <Button onClick={handleSubmit} disabled={isLoading} className="flex items-center gap-2">
        {isLoading && <Atom color="#32cd32" size="medium" />}
        {isLoading ? "Yuklanmoqda..." : "Qo'shish"}
      </Button>
    </div>
  )
}
