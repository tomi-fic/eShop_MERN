import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
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
