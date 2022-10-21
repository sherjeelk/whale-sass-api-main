import { Service } from '.'

let service

beforeEach(async () => {
  service = await Service.create({ name: 'test', active: 'test', image: 'test', parent: 'test', isChild: 'test', additional: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = service.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(service.id)
    expect(view.name).toBe(service.name)
    expect(view.active).toBe(service.active)
    expect(view.image).toBe(service.image)
    expect(view.parent).toBe(service.parent)
    expect(view.isChild).toBe(service.isChild)
    expect(view.additional).toBe(service.additional)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = service.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(service.id)
    expect(view.name).toBe(service.name)
    expect(view.active).toBe(service.active)
    expect(view.image).toBe(service.image)
    expect(view.parent).toBe(service.parent)
    expect(view.isChild).toBe(service.isChild)
    expect(view.additional).toBe(service.additional)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
