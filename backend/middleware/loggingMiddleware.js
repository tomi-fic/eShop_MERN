import { generateLogging } from '../utils/generateLogging.js'

export const logger = (req, res, next) => {
  generateLogging(req, 'S')
  next()
}
