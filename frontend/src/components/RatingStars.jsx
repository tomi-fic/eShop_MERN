import React from 'react'
import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings'
import styled from 'styled-components'

const Span = styled.span`
  font-size: 12px;
  padding: 0.5rem;
`

const RatingStars = ({ rating, numReviews }) => {
  return (
    <div style={{ display: 'flex', alignContent: 'center' }}>
      <StarRatings
        rating={rating}
        starRatedColor='orange'
        // starHoverColor=''
        changeRating={(rating) => {
          console.log('new rating: ', rating)
        }}
        numberOfStars={5}
        name='rating'
        starDimension='12px'
        starSpacing='1px'
        isSelectable='true'
      />
      {numReviews && <Span>{numReviews} reviews</Span>}
    </div>
  )
}

// RatingStars.propTypes = {
//   rating: PropTypes.number.isRequired,
//   numReviews: PropTypes.number.isRequired,
// }

export default RatingStars
