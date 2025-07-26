import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI as string

export async function GET() {
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db("fermerdb")
  const products = await db.collection("products").find({}).toArray()
  await client.close()
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const body = await req.json()
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db("fermerdb")
  const result = await db.collection("products").insertOne(body)
  await client.close()
  return NextResponse.json({ success: true, insertedId: result.insertedId })
}
