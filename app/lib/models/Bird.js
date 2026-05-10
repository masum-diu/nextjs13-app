import mongoose from 'mongoose'

const BirdSchema = new mongoose.Schema({
  slug:          { type: String, required: true, unique: true, trim: true },
  name:          { type: String, required: true, trim: true },
  origin:        { type: String, default: '' },
  categoryId:    { type: String, default: 'local' },
  subcategoryId: { type: String, default: '' },
  image:         { type: String, required: true },
  images:        [{ type: String }],
  rating:        { type: Number, default: 4.5, min: 0, max: 5 },
  reviews:       { type: Number, default: 0 },
  badge:         { type: String, default: '' },
  features:      [{ type: String }],
  description:   { type: String, default: '' },
  price:         { type: String, default: '' },
  available:     { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.models.Bird || mongoose.model('Bird', BirdSchema)
