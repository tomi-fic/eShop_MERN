import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import products from './data/products.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const { ...ENV } = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
}
const app = express()

app.get('/', (req, res) => {
  res.send('API is running')
})

app.get('/products', (req, res) => {
  res.json(products)
})

app.get('/product/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

app.listen(
  ENV.PORT,
  console.log(
    `Server running in ${ENV.NODE_ENV} mode on port ${ENV.PORT}`.yellow.bold
  )
)
