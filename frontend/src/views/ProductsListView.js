import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ProductEditModal from '../components/modals/productEditModal'
import { listProducts } from '../actions/productActions.js'
import RatingStars from '../components/RatingStars'
import styled from 'styled-components'

const Theme = {
  Image: styled(Image)`
    width: 50px;
  `,
}

const ProductListView = ({ history, match }) => {
  const dispatch = useDispatch()
  const { isPending, error, products } = useSelector(
    (state) => state.productList
  )
  const { userInfo } = useSelector((state) => state.userLogin)

  const [showEditModal, setShowEditModal] = useState(false)
  const [productToEdit, productUserToEdit] = useState({})

  const handleClose = () => setShowEditModal(false)
  const handleShow = (product) => {
    setShowEditModal(true)
    productUserToEdit(product)
  }

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/')
    } else {
      dispatch(listProducts())
    }
  }, [dispatch, userInfo, history])

  const onDeleteHandler = (product) => {
    if (window.confirm(`Are you sure to delete ${product.name} ?`)) {
      //  DELETE PRODUCT
    }
  }

  const onCreateProductHandler = () => {}

  return (
    <>
      <Row className='aling-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={onCreateProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {isPending ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='tale-sm'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>ENB</th>
              <th>IMG</th>
              <th>CATEGORY</th>
              <th>REVIEW</th>
              <th>PRICE</th>
              <th>DISC</th>
              <th>PCS</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, key) => (
              <tr key={key}>
                <td>
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </td>
                <td>
                  {product ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Theme.Image
                    src={product.image}
                    alt={product.name}
                    fluid
                    rounded
                  />
                </td>
                <td>{product.category}</td>
                <td>
                  <RatingStars rating={product.rating} />
                </td>
                <td>{product.price}€</td>
                <td>0%</td>
                <td>{product.countInStock}</td>
                <td>{product.brand}</td>
                <td>
                  <Button
                    variant='light'
                    className='btn-sm mx-2'
                    onClick={() => handleShow(product)}
                    active={false}
                  >
                    <i className='fas fa-edit'></i>
                  </Button>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => onDeleteHandler(product)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ProductEditModal
        show={showEditModal}
        onHide={handleClose}
        product={productToEdit}
        handleClose={handleClose}
      />
    </>
  )
}

export default ProductListView
