import express from 'express'
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getUserOrders,
  getAllOrders,
  updateOrders,
} from '../contollers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders)
  .put(protect, admin, updateOrders)
router.route('/myorders').get(protect, getUserOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
