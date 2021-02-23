import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/reducerConstants'

export const addToCart = (prod, qty) => (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      _id: prod._id,
      name: prod.name,
      image: prod.image,
      price: prod.price,
      countInStock: prod.countInStock,
      qty: qty,
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (product) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      _id: product._id,
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (address) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: address,
  })
  localStorage.setItem('shippingAddress', JSON.stringify(address))
}

export const savePaymentMethod = (method) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: method,
  })
  localStorage.setItem('paymentMethod', JSON.stringify(method))
}
