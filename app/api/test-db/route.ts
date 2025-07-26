// app/api/test-db/route.ts
import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string

export async function GET() {
  try {
    const client = new MongoClient(uri)
    await client.connect()

    const db = client.db('fermerdb')
    const collection = db.collection('test')
    const data = await collection.find({}).toArray()

    await client.close()

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'MongoDB ulanishda xatolik', detail: error.message },
      { status: 500 }
    )
  }
}
