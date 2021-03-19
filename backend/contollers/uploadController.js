import express from 'express'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/img')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const isValidExtension = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const isValidMimeType = filetypes.test(file.mimetype)

  if (isValidExtension && isValidMimeType) {
    return cb(null, true)
  } else {
    cb('Invalid image type')
  }
}

// @desc    Upload one product image
// @route   POST /uploads
// @access  Private/Admin
const uploadSingle = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).single('image')

export function uploadFile(req, res, next) {
  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400)
      next(new Error('Multer error occurred when uploading'))
    } else if (err) {
      res.status(400)
      next(new Error('Not valid image type'))
    } else {
      res.send(`/${req.file.path}`)
    }
  })
}

// @desc    Upload multiple product images
// @route   POST /uploads
// @access  Private/Admin
const uploadMultiple = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).array('images', 5)

export function uploadFiles(req, res, next) {
  uploadMultiple(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400)
      next(new Error('Multer error occurred when uploading'))
    } else if (err) {
      res.status(400)
      next(new Error('Not valid image type'))
    } else {
      const path = []
      req.files.forEach((file) => {
        path.push({ image: file.path })
      })
      res.send(path)
    }
  })
}
