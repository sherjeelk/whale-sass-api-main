import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, bySite } from './controller'
import { schema } from './model'
export Product, { schema } from './model'

const router = new Router()
const { name, price, desc, site, image, services, additional } = schema.tree

/**
 * @api {post} /products Create product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Product's name.
 * @apiParam price Product's price.
 * @apiParam site Product's site.
 * @apiParam desc Product's desc.
 * @apiParam image Product's image.
 * @apiParam services Multiple service relation.
 * @apiParam additional Product's additional params.
 * @apiParam site Product's site.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, price, desc, image, site, services, additional }),
  create)

/**
 * @api {get} /products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiUse listParams
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /products/site Retrieve site products
 * @apiName RetrieveSiteProducts
 * @apiGroup Product
 * @apiParam site SiteId
 * @apiParam services ServiceId
 * @apiUse listParams
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/site',
  query({
    site: {
      type: RegExp,
      paths: ['site']
    },
    services: {
      type: String,
      paths: ['services']
    }
  }),
  bySite)

/**
 * @api {get} /products/:id Retrieve product
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /products/:id Update product
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Product's name.
 * @apiParam site Product's site.
 * @apiParam price Product's price.
 * @apiParam desc Product's desc.
 * @apiParam image Product's image.
 * @apiParam services Multiple service relation.
 * @apiParam additional Product's additional params.
 * @apiParam site Product's site.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, price, desc, site, image, services, additional }),
  update)

/**
 * @api {delete} /products/:id Delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
