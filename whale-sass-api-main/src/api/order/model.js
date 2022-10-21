import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
  products: [{}],
  services: [{}],
  payment: {},
  additional: {},
  date: {
    type: Date,
    default: Date()
  },
  slot: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  postcode: {
    type: String
  },
  paid: {
    type: Boolean,
    default: false
  },
  status: {
    type: String
  },
  total: {
    type: Number,
    default: 0.00
  },
  subtotal: {
    type: Number,
    default: 0.00
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

orderSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      products: this.products,
      services: this.services,
      payment: this.payment,
      date: this.date,
      slot: this.slot,
      name: this.name,
      email: this.email,
      address: this.address,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Order', orderSchema)

export const schema = model.schema
export default model
