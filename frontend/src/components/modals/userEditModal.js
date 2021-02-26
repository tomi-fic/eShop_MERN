import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Modal, Form } from 'react-bootstrap'
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
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  React.useEffect(() => {
    setName(user.name)
    setEmail(user.email)
  }, [user])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      if (user._id === userInfo._id) {
        console.log('userEditModals USER UPDATE', user)
        // pre pripad ak user modifikuje sam seba
        // dispatch(
        //   updateUserProfile({
        //     id: user._id,
        //     name,
        //     email,
        //     password,
        //     token: userInfo.token,
        //   })
        // )
      } else {
        console.log('userEditModals ADMIN UPDATE', user)
        dispatch(
          updateUserProfileByAdmin({
            userToEdit: {
              id: user._id,
              name,
              email,
              password,
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
        <Button
          variant='secondary'
          disabled={
            userInfo && userInfo.name === name && userInfo.email === email
          }
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          variant='primary'
          onClick={(e) => {
            onSubmitHandler(e)
            handleClose()
          }}
        >
          Edit User
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserEditModal
