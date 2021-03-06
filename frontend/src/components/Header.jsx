import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions.js'
import styled from 'styled-components'

const Sup = styled.sup`
  top: -0.5em;
  position: relative;
  font-size: 75%;
  line-height: 0;
  vertical-align: baseline;
`

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const cart = useSelector((state) => state.cart)
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
                <i className='fas fa-cart-plus'></i>
                <span style={{ margin: '2px' }}>Cart</span>
                {cart.cartItems.length > 0 && (
                  <Sup>
                    <Badge variant='light' style={{ fontSize: '75%' }}>
                      {cart.cartItems.length}
                    </Badge>
                  </Sup>
                )}
              </NavLink>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  {!userInfo.isAdmin && (
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  {userInfo.isAdmin && (
                    <>
                      <LinkContainer to='/admin/users'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/products'>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orders'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
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
