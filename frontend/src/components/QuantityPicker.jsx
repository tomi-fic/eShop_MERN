import React from 'react'
import '../assets/scss/quantityPicker.scss'

const QuantityPicker = (props) => {
  return (
    <div className='quantity_flex'>
      <div className='quantity-input'>
        <button
          className='quantity-input__modifier quantity-input__modifier--left'
          onClick={() => {
            if (props.qty > 1) {
              props.setQty
                ? props.setQty(props.qty - 1)
                : props.setQtyDispatch(props.product, props.qty - 1)
            }
          }}
        >
          <i className='far fa-minus-square'></i>
        </button>
        <input
          className='quantity-input__screen'
          type='text'
          value={props.qty}
          readOnly
        />
        <button
          className='quantity-input__modifier quantity-input__modifier--right'
          onClick={() => {
            if (props.stockCount > props.qty) {
              props.setQty
                ? props.setQty(props.qty + 1)
                : props.setQtyDispatch(props.product, props.qty + 1)
            }
          }}
        >
          <i className='far fa-plus-square'></i>
        </button>
      </div>
    </div>
  )
}

export default QuantityPicker
