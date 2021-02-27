import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Form, Col, Row } from 'react-bootstrap'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
import {
  updateUserProfile,
  updateUserProfileByAdmin,
} from '../../actions/userActions'

const UserEditModal = ({ show, handleClose, user }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  //
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isAdmin, setIsAdmin] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  React.useEffect(() => {
    setName(user.name)
    setEmail(user.email)
    setIsAdmin(user.isAdmin)
  }, [user])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      if (!userInfo.isAdmin) {
        console.log('ups tu som')
        dispatch(
          updateUserProfile({
            id: user._id,
            name,
            email,
            password,
            token: userInfo.token,
          })
        )
      } else {
        console.log('user + admin', user, isAdmin)
        dispatch(
          updateUserProfileByAdmin({
            userToEdit: {
              id: user._id,
              name,
              email,
              password,
              isAdmin,
            },
          })
        )
      }
    } else {
      setMessage('Passwords do not match')
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='isadmin' as={Row}>
            {/* <Form.Label column sm={1}></Form.Label> */}
            <Col sm={4} style={{ padding: '6px', marginLeft: '10px' }}>
              <Form.Check
                type='checkbox'
                checked={isAdmin}
                label=' Is admin? '
                onChange={(e) => setIsAdmin(!isAdmin)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='enter password'
              autoComplete='off'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='confirm password'
              autoComplete='off'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          *all fields are optional
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button
          variant='primary'
          onClick={(e) => {
            onSubmitHandler(e)
            handleClose()
          }}
          disabled={
            user &&
            user.name === name &&
            user.email === email &&
            user.isAdmin === isAdmin
          }
        >
          Edit User
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserEditModal
