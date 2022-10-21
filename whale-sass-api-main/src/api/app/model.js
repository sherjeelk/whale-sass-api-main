import mongoose, { Schema } from 'mongoose'

const appSchema = new Schema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  username: String,
  password: String,
  url: String,
  identifier: {
    type: String
  },
  apiKey1: {
    type: String
  },
  apiKey2: {
    type: String
  },
  active: {
    type: String
  },
  site: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

appSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      type: this.type,
      identifier: this.identifier,
      apiKey1: this.apiKey1,
      apiKey2: this.apiKey2,
      username: this.username,
      password: this.password,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('App', appSchema)

export const schema = model.schema
export default model
