import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import Message from '../components/Message'
import QuantityPicker from '../components/QuantityPicker'
import { removeFromCart, addToCart } from '../actions/cartActions.js'
import styled from 'styled-components'

const Theme = {
  StyledButton: styled(Button)`
    .btn-default:focus {
      outline: none;
      box-shadow: none;
    }
  `,
  H1: styled.h1`
    font-size: 2rem;
    padding: 1rem 0;
  `,
  H2: styled.h2`
    font-size: 1.5rem;
    padding: 0.5rem 0;
  `,
  Card: styled(Card)`
    margin-top: 2rem;
  `,
}

const CartView = (props) => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart(product, qty))
  }

  const checkoutHandler = () => {
    props.history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <Theme.H1>Shopping Cart</Theme.H1>
        {cart.cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cart.cartItems.map((product, key) => (
              <ListGroup.Item key={key}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </Col>
                  <Col md={2}>{product.price} €</Col>
                  <Col md={2}>
                    <QuantityPicker
                      qty={product.qty}
                      setQtyDispatch={addToCartHandler}
                      stockCount={product.countInStock}
                      product={product}
                    />
                  </Col>
                  <Col md={2}>
                    <Theme.StyledButton
                      type='button'
                      variant='light'
                      onClick={() => dispatch(removeFromCart(product))}
                    >
                      <i className='far fa-trash-alt'></i>
                    </Theme.StyledButton>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Theme.Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Theme.H2>
                Subtotal (
                {cart.cartItems.reduce(
                  (increment, item) => increment + item.qty,
                  0
                )}
                ) items
              </Theme.H2>
              <strong>
                {cart.cartItems
                  .reduce(
                    (increment, item) => increment + item.qty * item.price,
                    0
                  )
                  .toFixed(2)}
                €
              </strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cart.cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Theme.Card>
      </Col>
    </Row>
  )
}

export default CartView
