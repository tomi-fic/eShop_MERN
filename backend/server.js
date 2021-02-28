import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import { logger } from './middleware/loggingMiddleware.js'
// Routers
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
connectDB()

const { ...ENV } = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
}
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use(logger)
app.use('/products', productRoutes)
app.use('/users', userRoutes)
app.use('/orders', orderRoutes)

app.get('/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound)
app.use(errorHandler)

app.listen(
  ENV.PORT,
  console.log(
    `Server running in ${ENV.NODE_ENV} mode on port ${ENV.PORT}`.yellow.bold
  )
)
