import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Theme from '../utils/styledTheme'
import { getAllOrders, updateOrders } from '../actions/orderActions.js'
import TogglerContainer from '../components/containers/TogglerContainer'

const OrderListView = ({ history }) => {
  const dispatch = useDispatch()
  const { isPending, error, success, orders } = useSelector(
    (state) => state.ordersList
  )
  const { success: updateSuccess } = useSelector((state) => state.ordersUpdater)
  const { userInfo } = useSelector((state) => state.userLogin)

  const [isToggled, setIsToggled] = useState(false)
  const [ordersToEdit, setOrdersToEdit] = useState([])

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

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch, updateSuccess])

  const checkUpdatedOrders = () => {
    if (ordersToEdit !== []) {
      for (var i = 0; i < ordersToEdit.length; i++) {
        if (
          ordersToEdit[i].DeliveredChanged ||
          ordersToEdit[i].PaidChanged ||
          ordersToEdit[i].CancelledChanged ||
          ordersToEdit[i].ShippedChanged
        ) {
          return false
        }
      }
    }
    return true
  }

  const setToggleAction = (action, index) => {
    const isKeyword = 'is' + action
    const changedKeyword = action + 'Changed'
    setIsToggled(!isToggled)
    let newArray = ordersToEdit
    newArray[index] = {
      ...ordersToEdit[index],
      [isKeyword]: !ordersToEdit[index][isKeyword],
      [changedKeyword]:
        typeof ordersToEdit[index][changedKeyword] !== 'undefined'
          ? !ordersToEdit[index][changedKeyword]
          : true,
    }
    setOrdersToEdit(newArray)
  }

  const onSaveButton = () => {
    dispatch(
      updateOrders(
        ordersToEdit.filter(
          (x) =>
            x.DeliveredChanged ||
            x.PaidChanged ||
            x.CancelledChanged ||
            x.ShippedChanged
        )
      )
    )
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
            onClick={() => onSaveButton()}
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
              <th>SHIPPED</th>
              <th>DELIVERED</th>
              <th>CANCEL</th>
            </tr>
          </thead>
          <tbody>
            {console.log(
              'RENDER ordersToEdit: ',
              ordersToEdit.filter(
                (x) =>
                  x.DeliveredChanged ||
                  x.PaidChanged ||
                  x.CancelledChanged ||
                  x.ShippedChanged
              )
            )}
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
                  <td>{order.totalPrice}€</td>
                  <TogglerContainer
                    order={order}
                    index={key}
                    setToggleAction={setToggleAction}
                    action={'Paid'}
                  />
                  <TogglerContainer
                    order={order}
                    index={key}
                    setToggleAction={setToggleAction}
                    action={'Shipped'}
                  />
                  <TogglerContainer
                    order={order}
                    index={key}
                    setToggleAction={setToggleAction}
                    action={'Delivered'}
                  />
                  <TogglerContainer
                    order={order}
                    index={key}
                    setToggleAction={setToggleAction}
                    action={'Cancelled'}
                  />
                </tr>
              ))}
          </tbody>
        </Theme.Table>
      )}
    </>
  )
}

export default OrderListView
