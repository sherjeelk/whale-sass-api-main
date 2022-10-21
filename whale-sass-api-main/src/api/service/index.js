import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, bySite } from './controller'
import { schema } from './model'
export Service, { schema } from './model'

const router = new Router()
const { name, active, image, site, parent, isChild, additional } = schema.tree

/**
 * @api {post} /services Create service
 * @apiName CreateService
 * @apiGroup Service
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Service's name.
 * @apiParam active Service's active.
 * @apiParam image Service's image.
 * @apiParam site Service's site.
 * @apiParam parent Service's parent.
 * @apiParam isChild Service's isChild.
 * @apiParam additional Service's additional.
 * @apiSuccess {Object} service Service's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Service not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, active, image, site, parent, isChild, additional }),
  create)

/**
 * @api {get} /services Retrieve services
 * @apiName RetrieveServices
 * @apiGroup Service
 * @apiUse listParams
 * @apiSuccess {Object[]} services List of services.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /services/site Retrieve site services
 * @apiName RetrieveSiteServices
 * @apiGroup Service
 * @apiParam site SiteId
 * @apiUse listParams
 * @apiSuccess {Object[]} services List of services.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/site',
  query({
    site: {
      type: RegExp,
      paths: ['site']
    }
  }),
  bySite)

/**
 * @api {get} /services/:id Retrieve service
 * @apiName RetrieveService
 * @apiGroup Service
 * @apiSuccess {Object} service Service's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Service not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /services/:id Update service
 * @apiName UpdateService
 * @apiGroup Service
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Service's name.
 * @apiParam active Service's active.
 * @apiParam site Service's site.
 * @apiParam image Service's image.
 * @apiParam parent Service's parent.
 * @apiParam isChild Service's isChild.
 * @apiParam additional Service's additional.
 * @apiSuccess {Object} service Service's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Service not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, active, site, image, parent, isChild, additional }),
  update)

/**
 * @api {delete} /services/:id Delete service
 * @apiName DeleteService
 * @apiGroup Service
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Service not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
