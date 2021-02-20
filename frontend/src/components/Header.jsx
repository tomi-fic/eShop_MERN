import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions.js'

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const dispatch = useDispatch()

  const onLogoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <NavLink to='/' className='nav-link'>
            <Navbar.Brand>eShop</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto' defaultActiveKey='/'>
              <NavLink to='/cart' className='nav-link'>
                <i className='fas fa-cart-plus'></i> Cart
              </NavLink>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={onLogoutHandler}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink to='/login' className='nav-link'>
                  <i className='fas fa-user'></i> Sign In
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
