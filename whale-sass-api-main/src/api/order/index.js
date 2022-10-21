import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Order, { schema } from './model'

const router = new Router()
const { products, services, payment, date, slot, name, email, address, total, subtotal } = schema.tree

/**
 * @api {post} /orders Create order
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam products Order's products.
 * @apiParam services Order's services.
 * @apiParam payment Order's payment.
 * @apiParam date Order's date.
 * @apiParam slot Order's slot.
 * @apiParam name Order's name.
 * @apiParam email Order's email.
 * @apiParam address Order's address.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  master(),
  body({ products, services, payment, date, slot, name, email, address, total, subtotal }),
  create)

/**
 * @api {get} /orders Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Order
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} orders List of orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /orders/:id Retrieve order
 * @apiName RetrieveOrder
 * @apiGroup Order
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /orders/:id Update order
 * @apiName UpdateOrder
 * @apiGroup Order
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam products Order's products.
 * @apiParam services Order's services.
 * @apiParam payment Order's payment.
 * @apiParam date Order's date.
 * @apiParam slot Order's slot.
 * @apiParam name Order's name.
 * @apiParam email Order's email.
 * @apiParam address Order's address.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  master(),
  body({ products, services, payment, date, slot, name, email, address }),
  update)

/**
 * @api {delete} /orders/:id Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Order not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
