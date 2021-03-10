import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Form, Col, Row } from 'react-bootstrap'
import Message from '../../components/Message'
import { createProduct } from '../../actions/productActions.js'
import {
  productCategories,
  productBrands,
} from '../../constants/productConstants.js'

const ProductCreatetModal = ({ show, handleClose, product }) => {
  const dispatch = useDispatch()
  const { createSuccess, error } = useSelector((state) => state.productHandler)
  //

  const [name, setName] = useState('')
  const [category, setCategory] = useState('Electronics')
  const [brand, setBrand] = useState('Apple')
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [isEnabled, setIsEnabled] = useState(true)
  const [desc, setDesc] = useState('')

  useEffect(() => {
    setName('')
    setCategory('Electronics')
    setBrand('Apple')
    setPrice(0)
    setDiscount(0)
    setCountInStock(0)
    setIsEnabled(true)
    setDesc('')
    createSuccess && handleClose()
  }, [createSuccess, show])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProduct({
        name,
        category,
        price,
        brand,
        discount,
        isEnabled,
        countInStock,
        description: desc,
      })
    )
    // handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span style={{ fontSize: '16px' }}>
            <strong>Create new product</strong>
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
                required
                type='name'
                placeholder='enter name'
                value={name}
                size='sm'
                onChange={(e) => setName(e.target.value)}
                isInvalid={!name}
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
                isInvalid={!price}
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
                isInvalid={!countInStock}
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
          <Form.Group controlId='description' as={Row}>
            <Form.Label as={Col} sm='2'>
              Desc
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as='textarea'
                size='sm'
                placeholder='enter description'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ height: '100px' }}
              />
            </Col>
          </Form.Group>
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
          disabled={!price || !name || !countInStock}
        >
          Create product
        </Button>
      </Modal.Footer>
      {error && <Message variant='danger'>{error}</Message>}
    </Modal>
  )
}

export default ProductCreatetModal
