import asyncHandler from 'express-async-handler'
import { User } from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email })
  const isValidPassword = await user.matchBcryptPassword(password)

  if (user && isValidPassword) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
  console.log('Route:', req.originalUrl.green)
})
