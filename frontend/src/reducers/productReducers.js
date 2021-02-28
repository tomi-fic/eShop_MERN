import {
  PRODUCT_LIST_PENDING,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_DETAIL_PENDING,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILED,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
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

export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_PENDING:
      return {
        isPending: true,
      }
    case PRODUCT_DETAIL_SUCCESS:
      return {
        isPending: false,
        product: action.payload,
      }
    case PRODUCT_DETAIL_FAILED:
      return {
        isPending: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        isPending: true,
      }
    case PRODUCT_DELETE_SUCCESS:
      return {
        isPending: false,
        success: true,
      }
    case PRODUCT_DELETE_FAIL:
      return {
        isPending: false,
        error: action.payload,
      }
    default:
      return state
  }
}
