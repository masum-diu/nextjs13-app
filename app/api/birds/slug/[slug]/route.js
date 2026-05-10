import { NextResponse } from 'next/server'
import { connectDB } from '../../../../lib/mongoose'
import Bird from '../../../../lib/models/Bird'

export async function GET(req, { params }) {
  try {
    await connectDB()
    const bird = await Bird.findOne({ slug: params.slug })
    if (!bird) return NextResponse.json({ error: 'Bird not found' }, { status: 404 })
    return NextResponse.json({ bird })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
