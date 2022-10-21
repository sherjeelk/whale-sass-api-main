import { success, notFound } from '../../services/response/'
import { City } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  City.create(body)
    .then((city) => city.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  City.count(query)
    .then(count => City.find(query, select, cursor)
      .then((cities) => ({
        count,
        rows: cities.map((city) => city.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  City.findById(params.id)
    .then(notFound(res))
    .then((city) => city ? city.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  City.findById(params.id)
    .then(notFound(res))
    .then((city) => city ? Object.assign(city, body).save() : null)
    .then((city) => city ? city.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  City.findById(params.id)
    .then(notFound(res))
    .then((city) => city ? city.remove() : null)
    .then(success(res, 204))
    .catch(next)
