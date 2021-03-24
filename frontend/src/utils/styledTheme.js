import styled from 'styled-components'
import { Table } from 'react-bootstrap'

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
}

export default Theme
