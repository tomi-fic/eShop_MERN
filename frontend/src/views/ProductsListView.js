import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ProductEditModal from '../components/modals/productEditModal'
import ProductCreatetModal from '../components/modals/productCreateModal'
import { listProducts } from '../actions/productActions.js'
import RatingStars from '../components/RatingStars'
import { deleteProduct } from '../actions/productActions.js'
import { resetImgHandler } from '../actions/uploadActions.js'
import Theme from '../utils/styledTheme'

const ProductListView = ({ history, match }) => {
  const dispatch = useDispatch()
  const { isPending, error, products } = useSelector(
    (state) => state.productList
  )
  const { success } = useSelector((state) => state.productHandler)
  const { userInfo } = useSelector((state) => state.userLogin)

  const [showEditModal, setShowEditModal] = useState(false)
  const [modalMode, setModalMode] = useState('')
  const [productToEdit, productUserToEdit] = useState({})

  const handleClose = () => {
    setShowEditModal(false)
    dispatch(resetImgHandler)
  }
  const handleShow = (product, mode) => {
    setModalMode(mode)
    setShowEditModal(true)
    productUserToEdit(product)
  }

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/')
    } else {
      dispatch(listProducts())
    }
  }, [dispatch, userInfo, history, success])

  const onDeleteHandler = (product) => {
    if (window.confirm(`Are you sure to delete ${product.name} ?`)) {
      dispatch(deleteProduct(product._id))
    }
  }

  return (
    <>
      <Row className='aling-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Theme.Button
            variant='primary'
            className='my-3'
            onClick={() => handleShow({}, 'create')}
          >
            <i className='fas fa-plus'></i> Create Product
          </Theme.Button>
        </Col>
      </Row>
      {isPending ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Theme.Table striped bordered hover responsive className='tale-sm'>
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
                  {product.isEnabled ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Theme.Image
                    src={product.gallery[0].image}
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
                <td>{product.discount}%</td>
                <td>{product.countInStock}</td>
                <td>{product.brand}</td>
                <td>
                  <Theme.Button
                    variant='light'
                    className='btn-sm mx-2'
                    onClick={() => handleShow(product, 'edit')}
                    active={false}
                  >
                    <Theme.i className='fas fa-edit'></Theme.i>
                  </Theme.Button>
                  <Theme.Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => onDeleteHandler(product)}
                  >
                    <i className='fas fa-trash'></i>
                  </Theme.Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Theme.Table>
      )}
      {modalMode === 'edit' ? (
        <ProductEditModal
          show={showEditModal}
          onHide={handleClose}
          product={productToEdit}
          handleClose={handleClose}
        />
      ) : modalMode === 'create' ? (
        <ProductCreatetModal
          show={showEditModal}
          onHide={handleClose}
          handleClose={handleClose}
        />
      ) : null}
    </>
  )
}

export default ProductListView
