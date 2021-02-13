import React from 'react'
import products from '../products'
import { Row, Col } from 'react-bootstrap'

const HomeView = () => {
  return (
    <>
      <h1>Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <h3>{product.name}</h3>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeView
