import {
  PRODUCT_LIST_PENDING,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
} from '../constants/reducerConstants.js'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_PENDING:
      return {
        isPending: true,
      }
    case PRODUCT_LIST_SUCCESS:
      return {
        isPending: false,
        products: action.payload,
      }
    case PRODUCT_LIST_FAILED:
      return {
        isPending: false,
        error: action.payload,
      }
    default:
      return state
  }
}
