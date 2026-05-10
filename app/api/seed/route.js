import { NextResponse } from 'next/server'
import { connectDB } from '../../lib/mongoose'
import Bird from '../../lib/models/Bird'
import { birds as staticBirds } from '../../lib/birds'

export async function POST() {
  try {
    await connectDB()

    let inserted = 0
    let skipped  = 0

    for (const bird of staticBirds) {
      const exists = await Bird.findOne({ slug: bird.slug })
      if (exists) { skipped++; continue }
      await Bird.create(bird)
      inserted++
    }

    return NextResponse.json({ success: true, inserted, skipped })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
