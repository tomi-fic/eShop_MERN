import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import UserEditModal from '../components/modals/userEditModal'
import { getAllOrders } from '../actions/orderActions.js'

const OrderListView = ({ history }) => {
  const dispatch = useDispatch()
  const { isPending, error, orders } = useSelector((state) => state.ordersList)
  const { userInfo } = useSelector((state) => state.userLogin)

  const [showModal, setShowModal] = useState(false)
  const [userToEdit, setUserToEdit] = useState({})

  const handleClose = () => setShowModal(false)
  const handleShow = (user) => {
    setShowModal(true)
    setUserToEdit(user)
  }

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/')
    } else {
      dispatch(getAllOrders())
    }
  }, [dispatch, userInfo, history])

  const onDeleteHandler = (order) => {
    // if (window.confirm(`Are you sure to delete ${user.name} ?`)) {
    //   dispatch(deleteUser(user.id))
    // }
  }

  return (
    <>
      <h1>Orders</h1>
      {isPending ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='tale-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, key) => (
              <tr key={key}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}€</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.delivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Button
                    variant='light'
                    className='btn-sm'
                    onClick={() => handleShow(order)}
                    active={false}
                  >
                    <i className='fas fa-edit'></i>
                  </Button>
                </td>
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => onDeleteHandler(order)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <UserEditModal
        show={showModal}
        onHide={handleClose}
        user={userToEdit}
        handleClose={handleClose}
      />
    </>
  )
}

export default OrderListView
