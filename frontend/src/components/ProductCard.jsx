import React from 'react'
import { Card } from 'react-bootstrap'
import RatingStars from '../components/RatingStars'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.gallery[0].image} variant='top' />
      </Link>
      <Card.Body>
        <Card.Title as='div'>
          <strong>{product.brand}</strong>
        </Card.Title>
        <Link to={`/product/${product._id}`}>
          <Card.Text as='div'>{product.name}</Card.Text>
        </Link>
        <Card.Text as='div'>
          <RatingStars
            rating={product.rating}
            numReviews={product.numReviews}
          />
        </Card.Text>
        <Card.Text as='h3'>
          <div>{product.price}€</div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
