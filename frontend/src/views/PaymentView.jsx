import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/containers/FormContainer'
import { savePaymentMethod } from '../actions/cartActions.js'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentView = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  if (!shippingAddress) {
    history.push('/shipping')
  }
  const [paymentMethod, setpaymentMethod] = useState('Paypal')

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps stepNr={3} />
      <h1>Payment</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setpaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setpaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentView
