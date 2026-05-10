import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  phone:    { type: String, required: true, trim: true },
  birdName: { type: String, required: true },
  birdSlug: { type: String },
  message:  { type: String, trim: true },
  status:   { type: String, enum: ['new', 'contacted', 'done'], default: 'new' },
}, { timestamps: true })

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
