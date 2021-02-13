import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import RatingStars from '../components/RatingStars'
import products from '../products'

const ProductView = (props) => {
  // will be replaced by BE logic
  const prod = products.find((p) => p._id === props.match.params.id)

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={prod.image} alt={prod.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>{prod.name}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <RatingStars rating={prod.rating} numReviews={prod.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price: {prod.price}€</ListGroup.Item>
            <ListGroup.Item>
              <div style={{ textAlign: 'center' }}>{prod.description}</div>
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
                    <strong>{prod.price}€</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Stock:</Col>
                  <Col>
                    {prod.countInStock > 0
                      ? `${prod.countInStock} pcs`
                      : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={prod.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductView
