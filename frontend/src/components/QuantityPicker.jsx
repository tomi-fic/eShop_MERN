import React from 'react'
import '../assets/scss/quantityPicker.scss'

const QuantityPicker = (props) => {
  return (
    <div className='quantity_flex'>
      <div className='quantity-input'>
        <button
          className='quantity-input__modifier quantity-input__modifier--left'
          onClick={() => {
            props.qty > 1 && props.setQty(props.qty - 1)
          }}
        >
          <i className='far fa-minus-square'></i>
        </button>
        <input
          className='quantity-input__screen'
          type='text'
          value={props.qty}
          readonly
        />
        <button
          className='quantity-input__modifier quantity-input__modifier--right'
          onClick={() => {
            props.stockCount > props.qty && props.setQty(props.qty + 1)
          }}
        >
          <i className='far fa-plus-square'></i>
        </button>
      </div>
    </div>
  )
}

export default QuantityPicker
