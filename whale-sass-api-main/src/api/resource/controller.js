import { success, notFound } from '../../services/response/'
import { Resource } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Resource.create(body)
    .then((resource) => resource.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Resource.count(query)
    .then(count => Resource.find(query, select, cursor)
      .then((resources) => ({
        count,
        rows: resources.map((resource) => resource.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Resource.findById(params.id)
    .then(notFound(res))
    .then((resource) => resource ? resource.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Resource.findById(params.id)
    .then(notFound(res))
    .then((resource) => resource ? Object.assign(resource, body).save() : null)
    .then((resource) => resource ? resource.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Resource.findById(params.id)
    .then(notFound(res))
    .then((resource) => resource ? resource.remove() : null)
    .then(success(res, 204))
    .catch(next)
