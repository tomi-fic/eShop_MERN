import express from 'express'
import { uploadFile } from '../contollers/uploadController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(uploadFile)

export default router
