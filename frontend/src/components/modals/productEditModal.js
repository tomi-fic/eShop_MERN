import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Form, Col, Row } from 'react-bootstrap'
import Message from '../../components/Message'
import ImagePicker from '../../components/ImagePicker'
import FileUploader from '../../components/FileUploader'
import { updateProduct } from '../../actions/productActions.js'
import {
  productCategories,
  productBrands,
} from '../../constants/productConstants.js'
import { uploadImg, uploadImgs } from '../../actions/uploadActions.js'

const ProductEditModal = ({ show, handleClose, product }) => {
  const dispatch = useDispatch()
  const { error } = useSelector((state) => state.productHandler)
  const {
    isPending: isUploadPending,
    img: uploadImgArrayPath,
    error: uploadError,
  } = useSelector((state) => state.uploadHandler)
  //
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [isEnabled, setIsEnabled] = useState(true)
  const [desc, setDesc] = useState('')
  const [gallery, setGallery] = useState(product.gallery)
  const inputFile = useRef(null)

  useEffect(() => {
    setGallery(product.gallery)
    setName(product.name)
    setCategory(product.category)
    setBrand(product.brand)
    setPrice(product.price)
    setDiscount(product.discount)
    setCountInStock(product.countInStock)
    setIsEnabled(product.isEnabled)
    setDesc(product.description)
  }, [product, show])

  useEffect(() => {
    setGallery(gallery.concat(uploadImgArrayPath))
  }, [uploadImgArrayPath])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        id: product._id,
        name,
        category,
        price,
        brand,
        discount,
        isEnabled,
        countInStock,
        gallery,
        description: desc,
      })
    )
    handleClose()
  }

  const uploadFileHandler = async (e) => {
    dispatch(uploadImgs(e.target.files))
  }

  const onRemoveImg = (imageToRemove) => {
    const newImgArray = gallery.filter((item) => item.image !== imageToRemove)
    setGallery(newImgArray)
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
          <Form.Group controlid='name' as={Row}>
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
          <Form.Group controlid='category' as={Row}>
            <Form.Label as={Col} sm='2'>
              Category
            </Form.Label>
            <Col sm='4'>
              <Form.Control
                controlid='categoryControl'
                as='select'
                size='sm'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {productCategories.map((cat, key) => (
                  <option value={cat} key={key}>
                    {cat}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group controlid='brand' as={Row}>
            <Form.Label as={Col} sm='2'>
              Brand
            </Form.Label>
            <Col sm='4'>
              <Form.Control
                controlid='brandControl'
                as='select'
                size='sm'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                {productBrands.map((brand, key) => (
                  <option value={brand} key={key}>
                    {brand}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group controlid='price' as={Row}>
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
          <Form.Group controlid='discount' as={Row}>
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
          <Form.Group controlid='pieces' as={Row}>
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
          <Form.Group controlid='isenabled' as={Row}>
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
          <Form.Group controlid='image' as={Row}>
            <Form.Label as={Col} sm='2'>
              Image
            </Form.Label>
            <Col sm={2}>
              <FileUploader
                inputFile={inputFile}
                uploadFileHandler={uploadFileHandler}
              />
            </Col>
            <Col sm={8}>
              <ImagePicker
                gallery={gallery}
                onRemoveImg={onRemoveImg}
                uploadError={uploadError}
                isUploadPending={isUploadPending}
              />
            </Col>
          </Form.Group>
          <Form.Group controlid='description' as={Row}>
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
          disabled={
            (product &&
              product.name === name &&
              product.category === category &&
              product.price === price &&
              product.brand === brand &&
              product.discount === discount &&
              product.isEnabled === isEnabled &&
              product.countInStock === countInStock &&
              product.description === desc &&
              product.gallery === gallery) ||
            !price ||
            !name ||
            !countInStock
          }
        >
          Edit product
        </Button>
      </Modal.Footer>
      {error && <Message variant='danger'>{error}</Message>}
    </Modal>
  )
}

export default ProductEditModal
