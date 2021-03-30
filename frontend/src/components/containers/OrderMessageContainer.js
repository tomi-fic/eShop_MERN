import React from 'react'
import Message from '../Message'

const getOrderStatus = (order) => {
  if (order.isCancelled) {
    return {
      status: 'Cancelled',
      message: 'Cancelled',
      timestamp: order.cancelledAt,
      variant: 'danger',
    }
  } else if (order.isDelivered) {
    return {
      status: 'Delivered',
      message: 'Delivered',
      timestamp: order.deliveredAt,
      variant: 'success',
    }
  } else if (order.isShipped) {
    return {
      status: 'Shipped',
      message: 'in Shippment',
      timestamp: order.shippedAt,
      variant: 'info',
    }
  } else if (order.isPaid) {
    return {
      status: 'Paid',
      message: 'Paid',
      timestamp: order.paidAt,
      variant: 'info',
    }
  } else {
    return {
      status: 'Placed',
      message: 'Placed',
      timestamp: order.createdAt,
      variant: 'info',
    }
  }
}

const getShippingMessage = (status, timestamp) => {
  if (status === 'Placed') {
    return null
  }
  if (status === 'Paid') {
    return (
      <Message variant='info' size='sm'>
        Order is about to be shipped
      </Message>
    )
  } else {
    return (
      <Message variant='success' size='sm'>
        {status} on {timestamp.substring(0, 10)}
      </Message>
    )
  }
}

const getPaymentMessage = (status, timestamp) => {
  if (status === 'Placed') {
    return (
      <Message variant='warning' size='sm'>
        Order is preparing to be paid
      </Message>
    )
  } else if (status !== 'Cancelled') {
    return (
      <Message variant='success' size='sm'>
        Paid on {timestamp.substring(0, 10)}
      </Message>
    )
  } else {
    return null
  }
}

const OrderMessageContainer = ({ order, type }) => {
  const { status, message, timestamp, variant } = getOrderStatus(order)
  return (
    <div style={{ margin: '0.5rem .3rem 0px .5rem' }}>
      {type === 'Status' ? (
        <Message variant={variant} size='lg'>
          {message}
        </Message>
      ) : type === 'Shipping' ? (
        getShippingMessage(status, timestamp)
      ) : type === 'Payment' ? (
        getPaymentMessage(status, order.paidAt)
      ) : (
        <Message variant='success'>
          {status} on {timestamp.substring(0, 10)}
        </Message>
      )}
    </div>
  )
}

export default OrderMessageContainer
