import { City } from '.'

let city

beforeEach(async () => {
  city = await City.create({ name: 'test', postcode: 'test', city: 'test', active: 'test', area: 'test', country: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = city.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(city.id)
    expect(view.name).toBe(city.name)
    expect(view.postcode).toBe(city.postcode)
    expect(view.city).toBe(city.city)
    expect(view.active).toBe(city.active)
    expect(view.area).toBe(city.area)
    expect(view.country).toBe(city.country)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = city.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(city.id)
    expect(view.name).toBe(city.name)
    expect(view.postcode).toBe(city.postcode)
    expect(view.city).toBe(city.city)
    expect(view.active).toBe(city.active)
    expect(view.area).toBe(city.area)
    expect(view.country).toBe(city.country)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
