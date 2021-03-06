import {
  ORDER_BY_USER_FAIL,
  ORDER_BY_USER_REQUEST,
  ORDER_BY_USER_RESET,
  ORDER_BY_USER_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_RESET,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_UPDATE_FAIL,
  ORDER_LIST_UPDATE_REQUEST,
  ORDER_LIST_UPDATE_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from '../constants/reducerConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        isPending: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        isPending: false,
        success: true,
        order: action.payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        isPending: true,
        error: action.payload,
      }
    case ORDER_CREATE_RESET:
      return {
        state: {},
      }
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { isPending: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        isPending: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        isPending: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        isPending: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        isPending: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        isPending: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        isPending: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderByUserReducer = (
  state = { isPending: false, orders: [] },
  action
) => {
  switch (action.type) {
    case ORDER_BY_USER_REQUEST:
      return {
        isPending: true,
      }
    case ORDER_BY_USER_SUCCESS:
      return {
        isPending: false,
        orders: action.payload,
      }
    case ORDER_BY_USER_FAIL:
      return {
        isPending: false,
        error: action.payload,
      }
    case ORDER_BY_USER_RESET:
      return {
        isPending: false,
        orders: [],
      }
    default:
      return state
  }
}

export const ordersListReducer = (
  state = { isPending: false, orders: [] },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        isPending: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        isPending: false,
        orders: action.payload,
        success: true,
      }
    case ORDER_LIST_FAIL:
      return {
        isPending: false,
        error: action.payload,
      }
    case ORDER_LIST_RESET:
      return {
        isPending: false,
        orders: [],
      }
    default:
      return state
  }
}

export const ordersUpdateReducer = (
  state = { isPending: false, orders: [] },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_UPDATE_REQUEST:
      return {
        isPending: true,
      }
    case ORDER_LIST_UPDATE_SUCCESS:
      return {
        isPending: false,
        orders: action.payload,
        success: true,
      }
    case ORDER_LIST_UPDATE_FAIL:
      return {
        isPending: false,
        error: action.payload,
      }
    default:
      return state
  }
}
