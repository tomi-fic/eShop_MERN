import React from 'react'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import styled from 'styled-components'

const TogglerStyled = styled(Toggle)`
  &.react-toggle--checked .react-toggle-track {
    background-color: var(--success);
  }
  &.react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: var(--danger);
  }
  &.react-toggle--checked:hover:not(.react-toggle--disabled)
    .react-toggle-track {
    background-color: var(--success);
  }
  .react-toggle-track {
    background-color: var(--danger);
  }
`

const Toggler = ({ checked, disabled, onToggle }) => {
  return (
    <TogglerStyled
      defaultChecked={checked}
      onChange={onToggle}
      disabled={disabled}
    />
  )
}

export default Toggler
