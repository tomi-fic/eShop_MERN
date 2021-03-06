import asyncHandler from 'express-async-handler'
import { User } from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    register a new user
// @route   POST /users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  let user = await User.findOne({ email: email })

  if (user) {
    res.status(400)
    throw new Error('User already exists')
  }

  user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Auth user & get token
// @route   POST /users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email })
  const isValidPassword = password && (await user.matchBcryptPassword(password))

  if (user && isValidPassword) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    GET user profile
// @route   GET /users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

// @desc    GET all users
// @route   GET /users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password')
  res.json(users)
})

// @desc    UPDATE user profile
// @route   PUT /users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id)
  const user = req.user

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

// @desc    UPDATE user profile by ADMIN
// @route   PUT /users/:id
// @access  Private/Admin
export const updateUserProfileByAdmin = asyncHandler(async (req, res) => {
  const oldUser = await User.findById(req.params.id)
  const newUser = req.body.userToEdit

  if (oldUser) {
    oldUser.name = newUser.name || oldUser.name
    oldUser.email = newUser.email || oldUser.email
    oldUser.isAdmin = newUser.isAdmin
    if (newUser.password) {
      oldUser.password = newUser.password
    }

    const updatedUser = await oldUser.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Delete user
// @route   DELETE /users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
  res.json(user)
})
