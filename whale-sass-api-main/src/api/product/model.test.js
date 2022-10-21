import { Product } from '.'

let product

beforeEach(async () => {
  product = await Product.create({ name: 'test', price: 'test', desc: 'test', image: 'test', services: 'test', additional: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = product.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.name).toBe(product.name)
    expect(view.price).toBe(product.price)
    expect(view.desc).toBe(product.desc)
    expect(view.image).toBe(product.image)
    expect(view.services).toBe(product.services)
    expect(view.additional).toBe(product.additional)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = product.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.name).toBe(product.name)
    expect(view.price).toBe(product.price)
    expect(view.desc).toBe(product.desc)
    expect(view.image).toBe(product.image)
    expect(view.services).toBe(product.services)
    expect(view.additional).toBe(product.additional)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
