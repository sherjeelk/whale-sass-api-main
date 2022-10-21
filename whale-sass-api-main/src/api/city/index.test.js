import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { City } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, city

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  city = await City.create({})
})

test('POST /cities 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', postcode: 'test', city: 'test', active: 'test', area: 'test', country: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.postcode).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.active).toEqual('test')
  expect(body.area).toEqual('test')
  expect(body.country).toEqual('test')
})

test('POST /cities 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /cities 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /cities 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /cities/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${city.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(city.id)
})

test('GET /cities/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /cities/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${city.id}`)
    .send({ access_token: adminSession, name: 'test', postcode: 'test', city: 'test', active: 'test', area: 'test', country: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(city.id)
  expect(body.name).toEqual('test')
  expect(body.postcode).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.active).toEqual('test')
  expect(body.area).toEqual('test')
  expect(body.country).toEqual('test')
})

test('PUT /cities/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${city.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /cities/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${city.id}`)
  expect(status).toBe(401)
})

test('PUT /cities/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', postcode: 'test', city: 'test', active: 'test', area: 'test', country: 'test' })
  expect(status).toBe(404)
})

test('DELETE /cities/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${city.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /cities/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${city.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /cities/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${city.id}`)
  expect(status).toBe(401)
})

test('DELETE /cities/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
