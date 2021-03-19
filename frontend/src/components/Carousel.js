import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'

const ProductCarousel = ({ gallery }) => {
  const [index, setIndex] = useState(0)
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {gallery.map((imgObj, key) => {
        return (
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={imgObj.image}
              alt='First slide'
            />
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default ProductCarousel
