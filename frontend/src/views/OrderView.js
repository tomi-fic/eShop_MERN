import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import OrderMessageContainer from '../components/containers/OrderMessageContainer'
import { getOrderDetails, payOrder } from '../actions/orderActions.js'
import { ORDER_PAY_RESET, CART_RESET } from '../constants/reducerConstants.js'
import Theme from '../utils/styledTheme.js'

const OrderView = ({ history, match }) => {
  const dispatch = useDispatch()
  const [isSdkReady, setIsSdkReady] = useState(false)
  const { order, isPending, error } = useSelector((state) => state.orderDetails)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { success: successPay, isPending: isPendingPay } = useSelector(
    (state) => state.orderPay
  )

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`
      script.async = true
      script.onload = () => {
        setIsSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || order._id !== match.params.id || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(match.params.id))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setIsSdkReady(true)
      }
    }
  }, [dispatch, order, match, successPay, userInfo])

  const onSuccessPaymentHandler = (payRes) => {
    dispatch(payOrder(order._id, payRes))
  }

  return isPending ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
      <Row>
        <Col md={8}>
          <h2 style={{ padding: '.75rem 1.25rem' }}>Order {match.params.id}</h2>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Theme.DivLeft>
                <h2 style={{ marginRight: '1rem' }}>Shipping</h2>
                <OrderMessageContainer order={order} type={'Shipping'} />
              </Theme.DivLeft>
              <p>
                <strong>Name: </strong>
                {order.user.name}
                <a href={`mailto:${order.user.email}`}>, {order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},
                {order.shippingAddress.postalCode}
                {'  '}
                {order.shippingAddress.city}, {order.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Theme.DivLeft>
                <h2 style={{ marginRight: '1rem' }}>Payment</h2>
                <OrderMessageContainer order={order} type={'Payment'} />
              </Theme.DivLeft>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant='danger'>Your order empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, key) => (
                    <ListGroup.Item key={key}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.gallery[0].image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price}€ ={' '}
                          <strong>{item.qty * item.price}€</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Row style={{ padding: '.75rem 1.25rem' }}>
            <Theme.DivCenter>
              <h3 style={{ margin: '3px' }}>Status:</h3>
              <OrderMessageContainer order={order} type={'Status'} />
            </Theme.DivCenter>
          </Row>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{order.itemsPrice.toFixed(2)}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{order.shippingPrice.toFixed(2)}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{order.taxPrice.toFixed(2)}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>TOTAL</strong>
                  </Col>
                  <Col>
                    <strong>{order.totalPrice.toFixed(2)}€</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid &&
                !order.isCancelled &&
                userInfo &&
                !userInfo.isAdmin && (
                  <ListGroup.Item>
                    {isPendingPay && <Loader />}
                    {!isSdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={onSuccessPaymentHandler}
                        options={{
                          currency: 'EUR',
                        }}
                      />
                    )}
                  </ListGroup.Item>
                )}

              {error && (
                <ListGroup.Item>
                  <Message variant='danger'>{error}</Message>
                </ListGroup.Item>
              )}

              {!order.isCancelled && userInfo && !userInfo.isAdmin && (
                <ListGroup.Item>
                  <Theme.DivCenter>
                    <Button
                      variant='secondary'
                      disabled={order.isShipped && true}
                      onClick={() => console.log('order cancelled')}
                    >
                      Cancel Order
                    </Button>
                  </Theme.DivCenter>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderView
