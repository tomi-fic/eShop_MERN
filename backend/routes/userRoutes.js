import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  updateUserProfileByAdmin,
  getUsers,
  deleteUser,
} from '../contollers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/login').post(authUser)
router
  .route('/profile')
  // .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser)
router.route('/admin/profile').put(protect, admin, updateUserProfileByAdmin)

export default router
