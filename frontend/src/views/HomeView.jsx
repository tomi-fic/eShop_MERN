import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import axios from 'axios'

const HomeView = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/products')
      setProducts(res.data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <h1>Products</h1>
      <Row>
        {products.map((product, key) => (
          <Col sm={12} md={6} lg={4} xl={3} key={key}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeView
