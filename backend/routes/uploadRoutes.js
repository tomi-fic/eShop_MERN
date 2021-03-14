import express from 'express'
import { uploadFile, uploadFiles } from '../contollers/uploadController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, admin, uploadFiles)

export default router
