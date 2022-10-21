import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy, getSiteApps } from './controller'
import { schema } from './model'
export App, { schema } from './model'

const router = new Router()
const { name, type, identifier, username, password,site, apiKey1, apiKey2, active } = schema.tree

/**
 * @api {post} /apps Create app
 * @apiName CreateApp
 * @apiGroup App
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name App's name.
 * @apiParam type App's type.
 * @apiParam site App's site.
 * @apiParam identifier App's identifier.
 * @apiParam apiKey1 App's apiKey1.
 * @apiParam apiKey2 App's apiKey2.
 * @apiParam active App's active.
 * @apiSuccess {Object} app App's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 App not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin', 'user'] }),
  body({ name, type, identifier, username, password, site, apiKey1, apiKey2, active }),
  create)

/**
 * @api {get} /apps Retrieve apps
 * @apiName RetrieveApps
 * @apiGroup App
 * @apiUse listParams
 * @apiSuccess {Object[]} apps List of apps.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({ required: true, roles: ['admin', 'user'] }),
  query(),
  index)

/**
 * @api {get} /apps Retrieve app with type
 * @apiName RetrieveAppType
 * @apiGroup App
 * @apiUse listParams
 * @apiSuccess {Object[]} apps List of apps.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/type',
  master(),
  query({
    site: {
      type: String,
      paths: ['site']
    },
    type: {
      type: String,
      paths: ['type']
    }
  }),
  index)

/**
 * @api {get} /apps/site Retrieve Site apps
 * @apiName RetrieveSiteApps
 * @apiGroup App
 * @apiParam site SiteId
 * @apiUse listParams
 * @apiSuccess {Object[]} apps List of apps.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/site',
  token({ required: true, roles: ['admin', 'user'] }),
  query({
    site: {
      type: String,
      paths: ['site']
    }
  }),
  getSiteApps)

/**
 * @api {get} /apps/:id Retrieve app
 * @apiName RetrieveApp
 * @apiGroup App
 * @apiSuccess {Object} app App's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 App not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /apps/:id Update app
 * @apiName UpdateApp
 * @apiGroup App
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name App's name.
 * @apiParam type App's type.
 * @apiParam identifier App's identifier.
 * @apiParam site App's site.
 * @apiParam apiKey1 App's apiKey1.
 * @apiParam apiKey2 App's apiKey2.
 * @apiParam active App's active.
 * @apiSuccess {Object} app App's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 App not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin', 'user'] }),
  body({ name, type, identifier, site, username, password, apiKey1, apiKey2, active }),
  update)

/**
 * @api {delete} /apps/:id Delete app
 * @apiName DeleteApp
 * @apiGroup App
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 App not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin', 'user'] }),
  destroy)

export default router
