import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/reducerConstants'

const checkIfInCart = (cartList, product) => {
  let isInCart = false
  cartList.map((prod) => {
    if (prod._id === product._id) {
      isInCart = true
    }
    return null
  })
  return isInCart
}

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      if (checkIfInCart(state.cartItems, action.payload)) {
        return {
          ...state,
          cartItems: [
            ...state.cartItems.map((x) =>
              x._id === action.payload._id ? action.payload : x
            ),
          ],
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAdress: action.payload,
      }

    default:
      return state
  }
}
