import React from 'react'
import products from '../products'
import { Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'

const HomeView = () => {
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
