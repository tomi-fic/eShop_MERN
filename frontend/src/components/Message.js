import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children, size }) => {
  return size === 'lg' ? (
    <Alert
      variant={variant}
      style={{
        padding: '0.4rem 0.6rem',
        minWidth: '100px',
        textAlign: 'center',
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>
        <strong>{children}</strong>
      </span>
    </Alert>
  ) : size === 'sm' ? (
    <Alert variant={variant} style={{ padding: '0.2rem 0.4rem' }}>
      <span style={{ fontSize: '0.9rem' }}>
        <strong>{children}</strong>
      </span>
    </Alert>
  ) : (
    <Alert variant={variant}>{children}</Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
  size: 'nm',
}

export default Message
