import mongoose, { Schema } from 'mongoose'

const fileSchema = new Schema({
  name: {
    type: String
  },
  size: {
    type: String
  },
  ext: {
    type: String
  },
  originalName: {
    type: String
  },
  encoding: {
    type: String
  },
  identifier: {
    type: String
  },
  mimeType: {
    type: String
  },
  location: {
    type: String
  },
  url: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

fileSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      size: this.size,
      ext: this.ext,
      url: this.url,
      originalName: this.originalName,
      encoding: this.encoding,
      mimeType: this.mimeType,
      location: this.location,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      identifier: this.identifier
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('File', fileSchema)

export const schema = model.schema
export default model
