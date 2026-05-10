import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { connectDB } from '../../lib/mongoose'
import Bird from '../../lib/models/Bird'

export async function GET() {
  try {
    await connectDB()
    const birds = await Bird.find().sort({ createdAt: -1 })
    return NextResponse.json({ birds })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    await connectDB()
    const bird = await Bird.create(body)
    return NextResponse.json({ bird }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
