import styled from 'styled-components'
import { Table, Image, Button } from 'react-bootstrap'

const Theme = {
  Table: styled(Table)`
    &.table thead th {
      vertical-align: bottom;
      border-bottom: 0px;
    }
    th {
      text-align: center;
      vertical-align: middle;
      font-size: 0.75rem;
    }
    td {
      text-align: center;
      vertical-align: middle;
      font-size: 0.7rem;
    }
    &.table td,
    .table th {
      padding: 0.25rem;
    }
  `,
  DivCenter: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Image: styled(Image)`
    width: 50px;
  `,
  Button: styled(Button).attrs((props) => ({
    variant: props.variant,
  }))`
    &.btn-${(props) => props.variant}:focus {
      background-color: var(--${(props) => props.variant});
      border-color: var(--${(props) => props.variant});
      box-shadow: none;
    }
  `,
  i: styled.i`
    color: #5a5a5a;
  `,
}

export default Theme
