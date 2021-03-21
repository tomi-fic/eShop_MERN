import React from 'react'
import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

const getSize = (size) => {
  switch (size) {
    case 'sm':
      return '30px'
    case 'lg':
      return '100px'
    default:
      return '60px'
  }
}

const SpinnerStyled = styled(Spinner).attrs((props) => ({
  size: props.size,
}))`
  width: ${(props) => getSize(props.size)};
  height: ${(props) => getSize(props.size)};
  margin: auto;
  display: block;
`

const Loader = ({ size }) => {
  return (
    <SpinnerStyled animation='border' role='status' size={size}>
      <span className='sr-only'>Loading...</span>
    </SpinnerStyled>
  )
}

export default Loader
