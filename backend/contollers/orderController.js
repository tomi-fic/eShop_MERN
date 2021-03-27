import asyncHandler from 'express-async-handler'
import { Order } from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by ID
// @route   GET /orders/:id
// @access  Private (only for ordering user or admin)
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    if (
      !req.user.isAdmin &&
      req.user._id.toString().localeCompare(order.user._id) != 0
    ) {
      res.status(401)
      throw new Error('No authorized for this order details')
    } else {
      res.status(200).json(order)
    }
  } else {
    res.sendStatus(404)
    throw new Error('No order found')
  }
})

// @desc    Update order to paid
// @route   PUT /orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()
    res.status(200).json(updatedOrder)
  } else {
    res.sendStatus(404)
    throw new Error('No order found')
  }
})

// @desc    Get logged in user orders
// @route   GET /orders/myorders
// @access  Private
export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.status(200).json(orders)
})

// @desc    Get all orders
// @route   GET /orders
// @access  Private
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.status(200)
  res.json(orders)
})

// @desc    Update mulitple Orders
// @route   PUT /orders
// @access  Private, Admin
export const updateOrders = asyncHandler(async (req, res) => {
  const orders = req.body

  async function asyncForEach(orders) {
    for (let index = 0; index < orders.length; index++) {
      const order = await Order.findById(orders[index]._id)
      if (order) {
        order.isPaid = orders[index].isPaid
        typeof order.paidAt === 'undefined' && order.isPaid
          ? (order.paidAt = Date.now())
          : null
        order.isDelivered = orders[index].isDelivered
        typeof order.deliveredAt === 'undefined' && order.isDelivered
          ? (order.deliveredAt = Date.now())
          : null
        order.isCancelled = orders[index].isCancelled
        typeof order.cancelledAt === 'undefined' && order.isCancelled
          ? (order.cancelledAt = Date.now())
          : null
        order.isShipped = orders[index].isShipped
        typeof order.shippedAt === 'undefined' && order.isShipped
          ? (order.shippedAt = Date.now())
          : null
        await order.save()
      } else {
        res.sendStatus(404)
        throw new Error('No order found')
      }
    }
  }

  asyncForEach(orders)
  res.status(200).json(orders)
})
