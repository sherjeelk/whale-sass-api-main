import mongoose, { Schema } from 'mongoose'

const resourceSchema = new Schema({
  site: {
    type: Schema.ObjectId,
    ref: 'Site',
    required: false
  },
  port: {
    type: Number,
    unique: true,
    required: true
  },
  domain: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  },
  active: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

resourceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      site: this.site,
      port: this.port,
      domain: this.domain,
      available: this.available,
      active: this.active,
      date: this.date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Resource', resourceSchema)

export const schema = model.schema
export default model
