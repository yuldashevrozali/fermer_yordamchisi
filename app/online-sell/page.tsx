'use client'

import Link from "next/link"
import useSWR from "swr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function OnlineSalesPage() {
  const { data: products, isLoading } = useSWR("/api/products", fetcher)

  return (
    <div className="space-y-6 mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Online savdo</h1>
        <Link href="/online-sell/new">
          <Button>Mahsulot qo'shish</Button>
        </Link>
      </div>

      {isLoading && <p>Yuklanmoqda...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product: any, index: number) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={product.image} alt={product.name} width={300} height={200} className="rounded" />
              <p className="mt-2 font-semibold text-lg">Narxi: ${product.price}</p>
              <p>Sotuvchi: {product.seller}</p>
              <p>Sotuvchi: {product.phone}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
