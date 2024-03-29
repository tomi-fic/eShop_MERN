import asyncHandler from 'express-async-handler'
import { Product } from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc    Fetch single product
// @route   GET /products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   DELETE /products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Update a product
// @route   PUT /products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  const {
    name,
    category,
    price,
    brand,
    discount,
    isEnabled,
    countInStock,
    gallery,
    description,
  } = req.body

  if (product) {
    product.name = name || product.name
    product.category = category || product.category
    product.price = price || product.price
    product.brand = brand || product.brand
    product.discount = discount || product.discount
    product.isEnabled = isEnabled
    product.gallery = gallery
    product.countInStock = countInStock || product.countInStock
    product.description = description || product.description

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    price,
    brand,
    discount,
    isEnabled,
    countInStock,
    gallery,
    description,
  } = req.body

  const product = new Product({
    name,
    category,
    user: req.user._id,
    gallery,
    price,
    brand,
    discount,
    isEnabled,
    countInStock,
    description: description || '',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Create new review
// @route   POST /products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
