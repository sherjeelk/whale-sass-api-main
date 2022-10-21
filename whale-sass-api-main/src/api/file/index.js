import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, destroy, myFiles, destroyMultiple } from './controller'
import { upload } from '../../services/upload'

export File, { schema } from './model'

const router = new Router()

/**
 * @api {post} /files Create file
 * @apiName CreateFile
 * @apiGroup File
 * @apiParam name File's name.
 * @apiParam size File's size.
 * @apiParam ext File's ext.
 * @apiParam url File's url.
 * @apiParam location restaurant's identifier.
 * @apiSuccess {Object} file File's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 File not found.
 */
router.post('/', upload.single('file'), create)

/**
 * @api {get} /files Get files By Identifier
 * @apiName RetrieveFiles
 * @apiGroup File
 * @apiPermission user
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of files.
 * @apiSuccess {Object[]} rows List of files.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['user', 'admin', 'restaurant'] }),
  query({
    identifier: {
      type: String,
      paths: ['identifier']
    }
  }),
  myFiles)

/**
 * @api {get} /files/all Get all files
 * @apiName GetAllFiles
 * @apiGroup File
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of files.
 * @apiSuccess {Object[]} rows List of files.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/all',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /files/:id Retrieve file
 * @apiName RetrieveFile
 * @apiGroup File
 * @apiSuccess {Object} file File's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 File not found.
 */
router.get('/view/:id',
  show)

/**
 * @api {post} /files/delete Delete Multiple files
 * @apiName DeleteFiles
 * @apiParam {String[]} ids of files.
 * @apiGroup File
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 File not found.
 */
router.post('/delete',
  token({ required: true, roles: ['admin', 'restaurant'] }),
  destroyMultiple)

/**
 * @api {delete} /files/:id Delete file
 * @apiName DeleteFile
 * @apiGroup File
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 File not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin', 'restaurant'] }),
  destroy)

export default router
