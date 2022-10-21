import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Service } from '.'

const app = () => express(apiRoot, routes)

let userSession, service

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  service = await Service.create({})
})

test('POST /services 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', active: 'test', image: 'test', parent: 'test', isChild: 'test', additional: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.active).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.parent).toEqual('test')
  expect(body.isChild).toEqual('test')
  expect(body.additional).toEqual('test')
})

test('POST /services 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /services 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /services/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${service.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(service.id)
})

test('GET /services/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /services/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${service.id}`)
    .send({ access_token: userSession, name: 'test', active: 'test', image: 'test', parent: 'test', isChild: 'test', additional: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(service.id)
  expect(body.name).toEqual('test')
  expect(body.active).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.parent).toEqual('test')
  expect(body.isChild).toEqual('test')
  expect(body.additional).toEqual('test')
})

test('PUT /services/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${service.id}`)
  expect(status).toBe(401)
})

test('PUT /services/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, name: 'test', active: 'test', image: 'test', parent: 'test', isChild: 'test', additional: 'test' })
  expect(status).toBe(404)
})

test('DELETE /services/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${service.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /services/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${service.id}`)
  expect(status).toBe(401)
})

test('DELETE /services/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
