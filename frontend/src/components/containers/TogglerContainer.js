import React from 'react'
import Theme from '../../utils/styledTheme'
import Toggler from '../Toggler'

const TogglerContainer = ({ order, index, setToggleAction, action }) => {
  const isPaid = `is${action}`
  const isPaidChanged = `${action}Changed`
  const paidAt = `${action.toLowerCase()}At`
  return (
    <td
      style={order[isPaidChanged] === true ? { border: '2px solid blue' } : {}}
    >
      {order[isPaid] ? (
        <Theme.DivCenter>
          <span style={{ marginRight: '.7rem' }}>
            {!order[isPaidChanged] && order[paidAt].substring(0, 10)}
          </span>
          <Toggler
            checked={order[isPaid]}
            disabled={!order[isPaidChanged] && true}
          />
        </Theme.DivCenter>
      ) : (
        <Theme.DivCenter>
          <Toggler
            checked={order[isPaid]}
            onToggle={() => setToggleAction(action, index)}
          />
        </Theme.DivCenter>
      )}
    </td>
  )
}

export default TogglerContainer
