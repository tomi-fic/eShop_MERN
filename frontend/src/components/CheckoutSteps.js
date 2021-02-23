import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ stepNr }) => {
  const progressConfig = [
    {
      name: 'Sign In',
      link: '/login',
      step: 1,
    },
    {
      name: 'Shippment',
      link: '/shipping',
      step: 2,
    },
    {
      name: 'Payment',
      link: '/payment',
      step: 3,
    },
    {
      name: 'Place Order',
      link: '/placeorder',
      step: 4,
    },
  ]
  return (
    <Nav className='justify-content-center mb-4'>
      {progressConfig.map((step, key) => {
        if (stepNr >= step.step) {
          return (
            <Nav.Item key={key}>
              <LinkContainer to={step.link}>
                <Nav.Link>{step.name.toUpperCase()}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          )
        } else {
          return (
            <Nav.Item key={key}>
              <Nav.Link disabled>{step.name.toUpperCase()}</Nav.Link>
            </Nav.Item>
          )
        }
      })}
    </Nav>
  )
}

export default CheckoutSteps
