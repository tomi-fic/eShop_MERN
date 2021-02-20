import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../constants/reducerConstants.js'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        isPending: true,
      }
    case USER_LOGIN_SUCCESS:
      return {
        isPending: false,
        userInfo: action.payload,
      }
    case USER_LOGIN_FAIL:
      return {
        isPending: false,
        error: action.payload,
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        isPending: true,
      }
    case USER_REGISTER_SUCCESS:
      return {
        isPending: false,
        userInfo: action.payload,
      }
    case USER_REGISTER_FAIL:
      return {
        isPending: false,
        error: action.payload,
      }
    default:
      return state
  }
}
