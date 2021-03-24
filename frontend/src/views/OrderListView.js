import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Toggler from '../components/Toggler'
import Theme from '../utils/styledTheme'
import { getAllOrders } from '../actions/orderActions.js'

const OrderListView = ({ history }) => {
  const dispatch = useDispatch()
  const { isPending, error, success, orders } = useSelector(
    (state) => state.ordersList
  )
  const { userInfo } = useSelector((state) => state.userLogin)

  const [isToggled, setIsToggled] = useState(false)
  const [ordersToEdit, setOrdersToEdit] = useState([])
  const updatedOrders = []

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/')
    } else {
      if (!success) {
        dispatch(getAllOrders())
      } else {
        setOrdersToEdit(orders)
      }
    }
  }, [dispatch, userInfo, history, success])

  const checkUpdatedOrders = () => {
    if (ordersToEdit !== []) {
      for (var i = 0; i < ordersToEdit.length; i++) {
        if (
          ordersToEdit[i].changedIsDelivered ||
          ordersToEdit[i].changedIsPaid ||
          ordersToEdit[i].changedIsCancelled
        ) {
          return false
        }
      }
    }
    return true
  }

  const setToggleAction = (action, index) => {
    setIsToggled(!isToggled)
    let newArray = ordersToEdit
    newArray[index] = {
      ...ordersToEdit[index],
      isDelivered: !ordersToEdit[index].isDelivered,
      [action]:
        typeof ordersToEdit[index][action] !== 'undefined'
          ? !ordersToEdit[index][action]
          : true,
    }
    setOrdersToEdit(newArray)
  }

  return (
    <>
      <Row className='aling-items-center'>
        <Col>
          <h1>Orders</h1>
        </Col>
        <Col className='text-right'>
          <Button
            variant='primary'
            className='my-3'
            onClick={() => console.log('clicked to SAVE')}
            disabled={checkUpdatedOrders()}
          >
            <i className='fas fa-save'></i> SAVE
          </Button>
        </Col>
      </Row>
      {isPending ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Theme.Table striped bordered hover responsive className='tale-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>CANCEL</th>
            </tr>
          </thead>
          <tbody>
            {console.log('RENDER ordersToEdit: ', ordersToEdit)}
            {ordersToEdit &&
              ordersToEdit.map((order, key) => (
                <tr key={key}>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        {order._id}
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.totalPrice}€ {typeof order.changedIsDelivered}
                  </td>
                  <td
                    style={
                      order.changedIsPaid === true
                        ? { border: '2px solid blue' }
                        : {}
                    }
                  >
                    {order.isPaid ? (
                      <Theme.DivCenter>
                        <span style={{ marginRight: '.7rem' }}>
                          {order.paidAt.substring(0, 10)}
                        </span>
                        <Toggler checked={order.isPaid} disabled={true} />
                      </Theme.DivCenter>
                    ) : (
                      <Theme.DivCenter>
                        <Toggler
                          checked={order.isPaid}
                          onToggle={() => setToggleAction('changedIsPaid', key)}
                        />
                      </Theme.DivCenter>
                    )}
                  </td>
                  <td
                    style={
                      order.changedIsDelivered === true
                        ? { border: '2px solid blue' }
                        : {}
                    }
                  >
                    {order.delivered ? (
                      <Theme.DivCenter>
                        <span style={{ marginRight: '.7rem' }}>
                          {order.deliveredAt.substring(0, 10)}
                        </span>
                        <Toggler checked={order.delivered} disabled={true} />
                      </Theme.DivCenter>
                    ) : (
                      <Theme.DivCenter>
                        <Toggler
                          checked={order.delivered}
                          onToggle={() =>
                            setToggleAction('changedIsDelivered', key)
                          }
                        />
                      </Theme.DivCenter>
                    )}
                  </td>
                  <td
                    style={
                      order.changedIsCancelled === true
                        ? { border: '2px solid blue' }
                        : {}
                    }
                  >
                    <Theme.DivCenter>
                      <Toggler
                        checked={false}
                        onToggle={() =>
                          setToggleAction('changedIsCancelled', key)
                        }
                      />
                    </Theme.DivCenter>
                  </td>
                </tr>
              ))}
          </tbody>
        </Theme.Table>
      )}
    </>
  )
}

export default OrderListView
