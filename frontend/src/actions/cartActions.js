import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/reducerConstants'

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
