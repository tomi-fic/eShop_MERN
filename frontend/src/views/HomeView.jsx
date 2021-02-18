import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions.js'
import { Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeView = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Products</h1>
      {productList.isPending ? (
        <Loader />
      ) : productList.error ? (
        <Message variant='danger'>{productList.error}</Message>
      ) : (
        <Row>
          {productList.products.map((product, key) => (
            <Col sm={12} md={6} lg={4} xl={3} key={key}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeView
