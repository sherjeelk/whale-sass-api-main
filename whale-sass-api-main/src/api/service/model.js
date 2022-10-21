import mongoose, { Schema } from 'mongoose'

const serviceSchema = new Schema({
  name: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  image: {
    type: String
  },
  parent: {
    type: String
  },
  isChild: {
    type: Boolean,
    default: false
  },
  site: {
    type: String,
    required: true
  },
  additional: {
    type: [{}]
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

serviceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      active: this.active,
      image: this.image,
      parent: this.parent,
      isChild: this.isChild,
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

const model = mongoose.model('Service', serviceSchema)

export const schema = model.schema
export default model
