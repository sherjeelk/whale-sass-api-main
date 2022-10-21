import { success, notFound } from '../../services/response/'
import { File } from '.'
import * as fs from 'fs'
import * as path from 'path'
import { baseUrl } from '../../config'

export const create = (req, res, next) => {
  // const upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic')
  const location = req.body.identifier || 'whale-sass'
  const file = req.file
  if (req.fileValidationError) {
    return res.send(req.fileValidationError)
  } else if (!file) {
    return res.send('Please select an image to upload')
  }

  console.log('File Create', file)

  const ext = file.originalname.includes('.') ? file.originalname.split('.')[file.originalname.split('.').length - 1] : ''
  const body = {
    name: file.filename,
    originalName: file.originalname,
    encoding: file.encoding,
    location: file.location,
    // url: baseUrl + newPath.split(path.sep).join(path.posix.sep),
    size: file.size,
    mimeType: file.mimetype,
    identifier: location,
    ext
  }
  File.create(body)
    .then((file) => file.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  File.estimatedDocumentCount(query)
    .then(count => File.find(query, select, cursor)
      .then((files) => ({
        count,
        rows: files.map((file) => file.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const myFiles = ({ querymen: { query, select, cursor } }, res, next) => {
  query.identifier = query.identifier || 'foodbee'
  File.estimatedDocumentCount(query)
    .then(count => File.find(query, select, cursor)
      .then((files) => ({
        count,
        rows: files.map((file) => file.view())
      }))
    )
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  File.findById(params.id)
    .then(notFound(res))
    .then((file) => file ? file.view() : null)
    .then(success(res))
    .catch(next)

// Intentionally Commented :: Does not make sense to use update with a file type, better create a new

// export const update = ({ bodymen: { body }, params }, res, next) =>
//   File.findById(params.id)
//     .then(notFound(res))
//     .then((file) => file ? Object.assign(file, body).save() : null)
//     .then((file) => file ? file.view(true) : null)
//     .then(success(res))
//     .catch(next)

export const destroyMultiple = (req, res, next) => {
  const ids = req.body.ids
  if (ids.length > 0) {
    File.find({ _id: { $in: ids } })
      .then(notFound(res))
      .then(async (files) => {
        try {
          const del = req.user.role === 'admin'
          if (!del) {
            // for (const file of files) {
            //   // const resto = file.identifier !== 'foodbee' ? await Restaurant.findOne({ identifier: file.identifier }) : false
            //   // del = resto ? resto.identifier === file.identifier : false
            // }
          }
          if (!del) {
            return res.status(401).send()
          }
          for (const file of files) {
            if (file.location) fs.rmSync(file.location, { force: true })
            await file.remove()
          }
          return res.status(204).send()
        } catch (e) {
          return res.status(200).send({ status: -1, msg: 'An error occurred!' })
        }
      })
      .catch(next)
  } else {
    console.log(ids)
    return res.status(400).send()
  }
}

export const destroy = (req, res, next) => {
  const params = req.params
  File.findById(params.id)
    .then(notFound(res))
    .then(async (file) => {
      const del = req.user.role === 'admin'
      if (!del) {
        // const resto = file.identifier !== 'foodbee' ? await Restaurant.findOne({ identifier: file.identifier }) : false
        //  del = resto ? resto.identifier === file.identifier : false
      }
      if (!del) {
        return res.status(401).send()
      }
      if (file.location) fs.rmSync(file.location, { force: true })
      return file ? file.remove() : null
    })
    .then(success(res, 204))
    .catch(next)
}
