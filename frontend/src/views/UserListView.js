import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import UserEditModal from '../components/modals/userEditModal'
import { listUsers, deleteUser } from '../actions/userActions.js'
import Theme from '../utils/styledTheme'

const UserListView = ({ history }) => {
  const dispatch = useDispatch()
  const { isPending, error, users } = useSelector((state) => state.userList)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { success: successDelete } = useSelector((state) => state.userDelete)
  const { success: successEdit } = useSelector(
    (state) => state.userUpdateProfile
  )

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
      dispatch(listUsers())
    }
  }, [dispatch, userInfo, history, successDelete, successEdit])

  const onDeleteHandler = (user) => {
    if (window.confirm(`Are you sure to delete ${user.name} ?`)) {
      dispatch(deleteUser(user.id))
    }
  }

  return (
    <>
      <h1>Users</h1>
      {isPending ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Theme.Table striped bordered hover responsive className='tale-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, key) => (
              <tr key={key}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Button
                    variant='light'
                    className='btn-sm'
                    onClick={() => handleShow(user)}
                    active={false}
                  >
                    <i className='fas fa-edit'></i>
                  </Button>
                </td>
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => onDeleteHandler(user)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Theme.Table>
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

export default UserListView
