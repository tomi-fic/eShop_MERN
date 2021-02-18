import asyncHandler from 'express-async-handler'
import { Product } from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  console.log('Route:', req.originalUrl.green)
  // throw new Error('some Error')
  res.json(products)
})

// @desc    Fetch single product
// @route   GET /products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  console.log('Route:', req.originalUrl.green)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
