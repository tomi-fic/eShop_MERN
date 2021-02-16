import React from 'react'
import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

const SpinnerStyled = styled(Spinner)`
  width: 100px;
  height: 100px;
  margin: auto;
  display: block;
`

const Loader = () => {
  return (
    <SpinnerStyled animation='border' role='status'>
      <span className='sr-only'>Loading...</span>
    </SpinnerStyled>
  )
}

export default Loader
