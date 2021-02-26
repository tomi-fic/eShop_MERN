import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUserProfile } from '../actions/userActions.js'
import { getUserOrders } from '../actions/orderActions.js'
import styled from 'styled-components'

const Theme = {
  TD: styled.td`
    text-align: center;
    vertical-align: middle;
  `,
  TH: styled.th`
    text-align: center;
    vertical-align: middle;
  `,
}

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
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <Theme.TH>ID</Theme.TH>
                <Theme.TH>DATE</Theme.TH>
                <Theme.TH>TOTAL</Theme.TH>
                <Theme.TH>PAID</Theme.TH>
                <Theme.TH>DELIVERED</Theme.TH>
                <Theme.TH></Theme.TH>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order, key) => (
                <tr key={key}>
                  <Theme.TD>{order._id}</Theme.TD>
                  <Theme.TD>{order.createdAt.substring(0, 10)}</Theme.TD>
                  <Theme.TD>{order.totalPrice.toFixed(2)}€</Theme.TD>
                  <Theme.TD>
                    {order.isPaid ? (
                      <Button variant='success' className='btn-sm' disabled>
                        {order.paidAt.substring(0, 10)}
                      </Button>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </Theme.TD>
                  <Theme.TD>
                    {order.isDelivered ? (
                      <Button variant='success' className='btn-sm' disabled>
                        {order.deliveredAt.substring(0, 10)}
                      </Button>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </Theme.TD>
                  <Theme.TD>
                    <LinkContainer to={`orders/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </Theme.TD>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileView
