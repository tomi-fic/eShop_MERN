import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productDetails } from '../actions/productActions.js'
import { addToCart } from '../actions/cartActions.js'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap'
import RatingStars from '../components/RatingStars'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ImageGallery from '../components/ImageGallery'
import QuantityPicker from '../components/QuantityPicker'

const ProductView = (props) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const { isPending, error, product } = useSelector(
    (state) => state.productDetail
  )

  useEffect(() => {
    dispatch(productDetails(props.match.params.id))
  }, [dispatch, props.match.params.id])

  const addToCartHandler = () => {
    dispatch(addToCart(product, qty))
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {isPending ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            {product.gallery && <ImageGallery gallery={product.gallery} />}
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>{product.name}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <RatingStars
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: {product.price}€</ListGroup.Item>
              <ListGroup.Item>
                <div style={{ textAlign: 'center' }}>{product.description}</div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{(product.price * qty).toFixed(2)}€</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Stock:</Col>
                    <Col>
                      {product.countInStock > 0
                        ? `${product.countInStock} pcs`
                        : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <QuantityPicker
                          qty={qty}
                          setQty={setQty}
                          stockCount={product.countInStock}
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductView
