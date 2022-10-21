import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import {
  create,
  index,
  show,
  update,
  destroy,
  domainVerification,
  checkVerification,
  getMySites,
  deploySite,
  updateSite, updateOne
} from './controller'
import { schema } from './model'
export Site, { schema } from './model'

const router = new Router()
const { name, config, domain, url, site, theme, active, plan, color, logo, apps, custom, blocked } = schema.tree

/**
 * @api {post} /sites Create site
 * @apiName CreateSite
 * @apiGroup Site
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Site's name.
 * @apiParam config Site's config.
 * @apiParam url Site's url.
 * @apiParam active Site's active.
 * @apiParam plan Site's plan.
 * @apiParam color Site's color.
 * @apiParam logo Site's logo.
 * @apiParam apps Site's apps.
 * @apiParam custom Site's custom.
 * @apiParam blocked Site's blocked.
 * @apiSuccess {Object} site Site's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Site not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, config, url, active, theme, plan, color, logo, apps, custom, blocked }),
  create)

/**
 * @api {post} /sites/verifyDomain Verify Domain
 * @apiName VerifyDomain
 * @apiGroup Site
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Site's name.
 * @apiParam domain Site's domain.
 * @apiParam color Site's color.
 * @apiParam logo Site's logo.
 * @apiParam Site Site's id.
 * @apiSuccess {Object} site Site's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Site not found.
 * @apiError 401 user access only.
 */
router.post('/verifyDomain',
  token({ required: true, roles: ['admin', 'user'] }),
  body({ name, domain, color, logo, site }),
  domainVerification)

/**
 * @api {post} /sites/deploy Deploy site
 * @apiName Deploy Site
 * @apiGroup Site
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Site's name.
 * @apiParam domain Site's domain.
 * @apiParam color Site's color.
 * @apiParam logo Site's logo.
 * @apiSuccess {Object} site Site's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Site not found.
 * @apiError 401 user access only.
 */
router.post('/deploy',
  body({ domain }),
  deploySite)

/**
 * @api {post} /sites/update/deploy Deploy site
 * @apiName Deploy Site
 * @apiGroup Site
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Site's name.
 * @apiParam domain Site's domain.
 * @apiParam color Site's color.
 * @apiParam logo Site's logo.
 * @apiSuccess {Object} site Site's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Site not found.
 * @apiError 401 user access only.
 */
router.post('/update/deploy',
  body({ domain }),
  updateSite)

/**
 * @api {get} /sites/checkVerification/:id Check Domain Verification
 * @apiName CheckVerificationStatus
 * @apiGroup Site
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam id Site's id.
 * @apiSuccess {Object} site Site's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Site not found.
 * @apiError 401 user access only.
 */
router.get('/checkVerification/:id',
  token({ required: true, roles: ['admin', 'user'] }),
  body({ name, domain, color, logo }),
  checkVerification)

/**
 * @api {get} /sites Retrieve sites
 * @apiName RetrieveSites
 * @apiGroup Site
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of sites.
 * @apiSuccess {Object[]} rows List of sites.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /sites/my Retrieve My sites
 * @apiName RetrieveMySites
 * @apiGroup Site
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam id SiteId
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of sites.
 * @apiSuccess {Object[]} rows List of sites.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/my',
  token({ required: true }),
  query({
    id: {
      type: String,
      paths: ['user']
    }
  }),
  getMySites)

/**
 * @api {get} /sites/:id Retrieve site
 * @apiName RetrieveSite
 * @apiGroup Site
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} site Site's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Site not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  show)

/**
 * @api {put} /sites/:id Update site
 * @apiName UpdateSite
 * @apiGroup Site
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Site's name.
 * @apiParam config Site's config.
 * @apiParam url Site's url.
 * @apiParam active Site's active.
 * @apiParam plan Site's plan.
 * @apiParam color Site's color.
 * @apiParam logo Site's logo.
 * @apiParam apps Site's apps.
 * @apiParam theme Site's theme.
 * @apiParam custom Site's custom.
 * @apiParam blocked Site's blocked.
 * @apiSuccess {Object} site Site's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Site not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, config, url, active, plan, color, theme, logo, apps, custom, blocked }),
  update)

/**
 * @api {patch} /sites/:id Update Partial site
 * @apiName UpdatePartialSite
 * @apiGroup Site
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Site's name.
 * @apiParam config Site's config.
 * @apiParam url Site's url.
 * @apiParam active Site's active.
 * @apiParam plan Site's plan.
 * @apiParam color Site's color.
 * @apiParam logo Site's logo.
 * @apiParam apps Site's apps.
 * @apiParam theme Site's theme.
 * @apiParam custom Site's custom.
 * @apiParam blocked Site's blocked.
 * @apiSuccess {Object} site Site's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Site not found.
 * @apiError 401 user access only.
 */
router.patch('/:id',
  token({ required: true }),
  body(),
  updateOne)

/**
 * @api {delete} /sites/:id Delete site
 * @apiName DeleteSite
 * @apiGroup Site
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Site not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
