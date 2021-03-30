import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUserProfile } from '../actions/userActions.js'
import { getUserOrders } from '../actions/orderActions.js'
import Theme from '../utils/styledTheme'

const ProfileView = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [alert, setAlert] = useState(true)

  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  const {
    isPending: isOrderListPending,
    error: orderListError,
    orders: orderList,
  } = useSelector((state) => state.orderByUser)
  const { isPending, error, success } = useSelector(
    (state) => state.userUpdateProfile
  )

  useEffect(() => {
    setTimeout(() => {
      setAlert(false)
    }, 3000)

    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getUserOrders())
      setName(userInfo.name)
      setEmail(userInfo.email)
    }
  }, [history, userInfo, dispatch])

  const onSubmitHandler = (e) => {
    setAlert(true)
    e.preventDefault()
    if (password === confirmPassword) {
      dispatch(
        updateUserProfile({
          id: userInfo._id,
          name,
          email,
          password,
          token: userInfo.token,
        })
      )
    } else {
      setMessage('Passwords do not match')
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h1>Profile</h1>

        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {alert && success ? (
          <Message variant='success'>{'Profile updated'}</Message>
        ) : null}
        {isPending && <Loader></Loader>}

        <Form onSubmit={onSubmitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='enter password'
              autoComplete='off'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='confirm password'
              autoComplete='off'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type='submit'
            variant='primary'
            disabled={
              userInfo && userInfo.name == name && userInfo.email == email
            }
          >
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {isOrderListPending ? (
          <Loader />
        ) : orderListError ? (
          <Message variant='danger'>{orderListError}</Message>
        ) : orderList.length === 0 ? (
          <Message>You have no orders</Message>
        ) : (
          <Theme.Table bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>SHIPPED</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order, key) => (
                <tr
                  key={key}
                  style={
                    order.cancelledAt
                      ? {
                          backgroundColor: 'rgba(136,136,136, 0.2)',
                          color: 'var(--gray-dark)',
                        }
                      : {}
                  }
                >
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}€</td>
                  <td>
                    {order.isPaid ? (
                      <Button variant='success' className='btn-sm' disabled>
                        {order.paidAt.substring(0, 10)}
                      </Button>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isShipped ? (
                      <Button variant='success' className='btn-sm' disabled>
                        {order.shippedAt.substring(0, 10)}
                      </Button>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <Button variant='success' className='btn-sm' disabled>
                        {order.deliveredAt.substring(0, 10)}
                      </Button>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`orders/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Theme.Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileView
