import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { connectDB } from '../../../lib/mongoose'
import Bird from '../../../lib/models/Bird'

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    await connectDB()
    const bird = await Bird.findByIdAndUpdate(params.id, body, { new: true })
    return NextResponse.json({ bird })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    await Bird.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
