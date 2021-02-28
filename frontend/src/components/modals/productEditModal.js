import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Form, Col, Row } from 'react-bootstrap'
import Message from '../../components/Message'
// import Loader from '../components/Loader'
import {
  updateUserProfile,
  updateUserProfileByAdmin,
} from '../../actions/userActions'
import {
  productCategories,
  productBrands,
} from '../../constants/productConstants.js'

const ProductEditModal = ({ show, handleClose, product }) => {
  const dispatch = useDispatch()
  //
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [isEnabled, setIsEnabled] = useState(true)

  // const [message, setMessage] = useState(null)

  useEffect(() => {
    setName(product.name)
    setCategory(product.category)
    setBrand(product.brand)
    setPrice(product.price)
    setDiscount(product.discount ? product.discount : 0)
    setCountInStock(product.countInStock)
    setIsEnabled(product.isEnabled ? product.isEnabled : true)
    // setMessage(null)
  }, [product, show])

  const onSubmitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span style={{ fontSize: '16px' }}>
            Product ID: <strong>{product._id}</strong>
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='name' as={Row}>
            <Form.Label as={Col} sm='2'>
              Name
            </Form.Label>
            <Col sm='10'>
              <Form.Control
                type='name'
                placeholder='enter name'
                value={name}
                size='sm'
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group controlId='category' as={Row}>
            <Form.Label as={Col} sm='2'>
              Category
            </Form.Label>
            <Col sm='4'>
              <Form.Control
                controlId='categoryControl'
                as='select'
                size='sm'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {productCategories.map((cat, key) => (
                  <option value={cat}>{cat}</option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group controlId='brand' as={Row}>
            <Form.Label as={Col} sm='2'>
              Brand
            </Form.Label>
            <Col sm='4'>
              <Form.Control
                controlId='brandControl'
                as='select'
                size='sm'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                {productBrands.map((brand, key) => (
                  <option value={brand}>{brand}</option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group controlId='price' as={Row}>
            <Form.Label as={Col} sm='2'>
              Price
            </Form.Label>
            <Col sm='3' style={{ paddingRight: '5px' }}>
              <Form.Control
                type='number'
                placeholder='enter price'
                value={price}
                size='sm'
                onChange={(e) =>
                  e.target.value >= 0 && setPrice(e.target.value)
                }
              ></Form.Control>
            </Col>
            <Col sm='1' style={{ paddingLeft: '0px' }}>
              €
            </Col>
          </Form.Group>
          <Form.Group controlId='discount' as={Row}>
            <Form.Label as={Col} sm='2'>
              Discount
            </Form.Label>
            <Col sm='2' style={{ paddingRight: '5px' }}>
              <Form.Control
                type='number'
                placeholder='enter discount'
                value={discount}
                size='sm'
                onChange={(e) =>
                  e.target.value >= 0 && setDiscount(e.target.value)
                }
              ></Form.Control>
            </Col>
            <Col sm='1' style={{ paddingLeft: '0px' }}>
              %
            </Col>
          </Form.Group>
          <Form.Group controlId='pieces' as={Row}>
            <Form.Label as={Col} sm='2'>
              Pieces
            </Form.Label>
            <Col sm='3'>
              <Form.Control
                type='number'
                placeholder='enter pieces'
                value={countInStock}
                size='sm'
                onChange={(e) =>
                  e.target.value >= 0 && setCountInStock(e.target.value)
                }
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group controlId='isenabled' as={Row}>
            <Form.Label as={Col} sm='2'>
              Enabled
            </Form.Label>
            <Col sm={4}>
              <Form.Check
                type='checkbox'
                checked={isEnabled}
                size='sm'
                onChange={(e) => setIsEnabled(!isEnabled)}
              ></Form.Check>
            </Col>
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
          }}
          disabled={
            product &&
            product.name === name &&
            product.category === category &&
            product.price === price &&
            product.brand === brand &&
            // product.discount === discount &&
            // product.isEnabled === isEnabled &&
            product.countInStock === countInStock
          }
        >
          Edit product
        </Button>
      </Modal.Footer>
      {/* {message && <Message variant='danger'>{message}</Message>} */}
    </Modal>
  )
}

export default ProductEditModal
