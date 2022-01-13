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
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
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

export const productHandlerReducer = (state = {}, action) => {
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
    case PRODUCT_UPDATE_REQUEST:
      return {
        isPending: true,
      }
    case PRODUCT_UPDATE_SUCCESS:
      return {
        isPending: false,
        success: true,
      }
    case PRODUCT_UPDATE_FAIL:
      return {
        isPending: false,
        error: action.payload,
      }
    case PRODUCT_CREATE_REQUEST:
      return {
        isPending: true,
      }
    case PRODUCT_CREATE_SUCCESS:
      return {
        isPending: false,
        success: true,
        createSuccess: true,
      }
    case PRODUCT_CREATE_FAIL:
      return {
        isPending: false,
        error: action.payload,
      }
    case PRODUCT_REVIEW_CREATE_REQUEST:
      return {
        isPending: true,
      }
    case PRODUCT_REVIEW_CREATE_SUCCESS:
      return {
        isPending: false,
        success: true,
      }
    case PRODUCT_REVIEW_CREATE_FAIL:
      return {
        isPending: false,
        error: action.payload,
      }
    default:
      return state
  }
}
