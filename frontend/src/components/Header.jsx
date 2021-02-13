import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Header = () => {
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
              <NavLink to='/login' className='nav-link'>
                <i className='fas fa-user'></i> Sign In
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
