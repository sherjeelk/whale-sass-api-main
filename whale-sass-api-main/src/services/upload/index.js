const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const spacesEndpoint = new aws.Endpoint('ams3.digitaloceanspaces.com')
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: 'IBAHLNAXBLJL4YSHCHR3',
  secretAccessKey: 'nN7zwAdioYHaG7Xb+NVFqTl5VYPgm0Ygg2RKeuTl2O8'
})

// KEYID : 'IBAHLNAXBLJL4YSHCHR3'
// SECRET : 'nN7zwAdioYHaG7Xb+NVFqTl5VYPgm0Ygg2RKeuTl2O8'

// export const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/')
//   },
//
//   // By default, multer removes file extensions so let's add them back
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//   }
//
// })

let site = 'test'
export const storage = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'whale-sass',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
      cb(null, (req.query.identifier || 'whale-sass') + '/' + Date.now().toString() + '-' + file.originalname)
    }
  })
})

export const imageFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!'
    return cb(new Error('Only image files are allowed!'), false)
  }
  cb(null, true)
}

export const fileUpload = (req) => {
  // upload.single('file')
  console.log(req.query.identifier)
  site = req.query.identifier
  multer({ storage: storage.storage }).single('file')
}

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })
export const upload =  multer({ storage: storage.storage })
