import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { connectDB } from '../../lib/mongoose'
import Order from '../../lib/models/Order'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, phone, birdName, birdSlug, message } = body

    if (!name || !phone || !birdName) {
      return NextResponse.json({ error: 'Name, phone and bird are required' }, { status: 400 })
    }

    await connectDB()
    const order = await Order.create({ name, phone, birdName, birdSlug, message })
    return NextResponse.json({ success: true, order }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const orders = await Order.find().sort({ createdAt: -1 })
    return NextResponse.json({ orders })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
