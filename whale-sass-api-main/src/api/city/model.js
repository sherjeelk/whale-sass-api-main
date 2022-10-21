import mongoose, { Schema } from 'mongoose'

const citySchema = new Schema({
  name: {
    type: String
  },
  postcode: {
    type: String
  },
  city: {
    type: String
  },
  active: {
    type: String
  },
  area: {
    type: String
  },
  country: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

citySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      postcode: this.postcode,
      city: this.city,
      active: this.active,
      area: this.area,
      country: this.country,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('City', citySchema)

export const schema = model.schema
export default model
