import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Resource, { schema } from './model'

const router = new Router()
const { site, port, domain, available, active, date } = schema.tree

/**
 * @api {post} /resources Create resource
 * @apiName CreateResource
 * @apiGroup Resource
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam site Resource's site.
 * @apiParam port Resource's port.
 * @apiParam domain Resource's domain.
 * @apiParam available Resource's available.
 * @apiParam active Resource's active.
 * @apiParam date Resource's date.
 * @apiSuccess {Object} resource Resource's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Resource not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  body({ site, port, domain, available, active, date }),
  create)

/**
 * @api {get} /resources Retrieve resources
 * @apiName RetrieveResources
 * @apiGroup Resource
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of resources.
 * @apiSuccess {Object[]} rows List of resources.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /resources/:id Retrieve resource
 * @apiName RetrieveResource
 * @apiGroup Resource
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} resource Resource's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Resource not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /resources/:id Update resource
 * @apiName UpdateResource
 * @apiGroup Resource
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam site Resource's site.
 * @apiParam port Resource's port.
 * @apiParam domain Resource's domain.
 * @apiParam available Resource's available.
 * @apiParam active Resource's active.
 * @apiParam date Resource's date.
 * @apiSuccess {Object} resource Resource's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Resource not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ site, port, domain, available, active, date }),
  update)

/**
 * @api {delete} /resources/:id Delete resource
 * @apiName DeleteResource
 * @apiGroup Resource
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Resource not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
