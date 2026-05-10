import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { connectDB } from '../../lib/mongoose'
import Bird from '../../lib/models/Bird'

export async function GET(req) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const sub      = searchParams.get('sub')
    const search   = searchParams.get('search')

    const query = { available: { $ne: false } }
    if (category) query.categoryId    = category
    if (sub)      query.subcategoryId = sub
    if (search)   query.name = { $regex: search, $options: 'i' }

    const birds = await Bird.find(query).sort({ createdAt: -1 })
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
