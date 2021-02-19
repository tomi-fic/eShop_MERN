import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { User } from '../models/userModel.js'

export const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decodedJWT.id).select('-password')

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized - wrong token')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized - no token')
  }
})
