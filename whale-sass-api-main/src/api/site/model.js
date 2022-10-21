import mongoose, { Schema } from 'mongoose'

const siteSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  config: {
    type: { }
  },
  domain: String,
  verified: Boolean,
  verificationCode: String,
  url: {
    type: String
  },
  active: {
    type: String
  },
  plan: {
    type: String
  },
  color: {
    type: String
  },
  logo: {
    type: String
  },
  theme: String,
  apps: {},
  custom: {
    type: { }
  },
  blocked: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

siteSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      name: this.name,
      config: this.config,
      url: this.url,
      active: this.active,
      plan: this.plan,
      color: this.color,
      logo: this.logo,
      apps: this.apps,
      theme: this.theme,
      custom: this.custom,
      blocked: this.blocked,
      domain: this.domain,
      verified: this.verified,
      verificationCode: this.verificationCode,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Site', siteSchema)

export const schema = model.schema
export default model
