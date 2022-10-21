import { Router } from 'express'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import site from './site'
import app from './app'
import file from './file'
import city from './city'
import product from './product'
import service from './service'
import resource from './resource'
import order from './order'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/password-resets', passwordReset)
router.use('/sites', site)
router.use('/apps', app)
router.use('/files', file)
router.use('/cities', city)
router.use('/products', product)
router.use('/services', service)
router.use('/resources', resource)
router.use('/orders', order)

export default router
