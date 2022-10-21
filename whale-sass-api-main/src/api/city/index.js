import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export City, { schema } from './model'

const router = new Router()
const { name, postcode, city, active, area, country } = schema.tree

/**
 * @api {post} /cities Create city
 * @apiName CreateCity
 * @apiGroup City
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name City's name.
 * @apiParam postcode City's postcode.
 * @apiParam city City's city.
 * @apiParam active City's active.
 * @apiParam area City's area.
 * @apiParam country City's country.
 * @apiSuccess {Object} city City's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 City not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, postcode, city, active, area, country }),
  create)

/**
 * @api {get} /cities Retrieve cities
 * @apiName RetrieveCities
 * @apiGroup City
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of cities.
 * @apiSuccess {Object[]} rows List of cities.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /cities/:id Retrieve city
 * @apiName RetrieveCity
 * @apiGroup City
 * @apiSuccess {Object} city City's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 City not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /cities/:id Update city
 * @apiName UpdateCity
 * @apiGroup City
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name City's name.
 * @apiParam postcode City's postcode.
 * @apiParam city City's city.
 * @apiParam active City's active.
 * @apiParam area City's area.
 * @apiParam country City's country.
 * @apiSuccess {Object} city City's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 City not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, postcode, city, active, area, country }),
  update)

/**
 * @api {delete} /cities/:id Delete city
 * @apiName DeleteCity
 * @apiGroup City
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 City not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
