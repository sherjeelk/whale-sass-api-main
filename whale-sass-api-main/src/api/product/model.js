import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0.00
  },
  desc: {
    type: String
  },
  image: {
    type: String
  },
  services: [{
    type: Schema.ObjectId,
    ref: 'Service',
    required: false
  }],
  site: {
    type: String,
    required: true
  },
  additional: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

productSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      price: this.price,
      desc: this.desc,
      image: this.image,
      services: this.services,
      additional: this.additional,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model
