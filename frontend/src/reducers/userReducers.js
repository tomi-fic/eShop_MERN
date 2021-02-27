import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  // USER_DETAILS_SUCCESS,
  // USER_DETAILS_FAIL,
  // USER_DETAILS_REQUEST,
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

// export const userDetailsReducer = (state = { user: {} }, action) => {
//   switch (action.type) {
//     case USER_DETAILS_REQUEST:
//       return {
//         ...state,
//         isPending: true,
//       }
//     case USER_DETAILS_SUCCESS:
//       return {
//         isPending: false,
//         user: action.payload,
//       }
//     case USER_DETAILS_FAIL:
//       return {
//         isPending: false,
//         error: action.payload,
//       }
//     default:
//       return state
//   }
// }

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        isPending: true,
      }
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        isPending: false,
        success: true,
        user: action.payload,
      }
    case USER_UPDATE_PROFILE_FAIL:
      return {
        isPending: false,
        success: false,
        error: action.payload,
      }
    case USER_UPDATE_PROFILE_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        isPending: true,
      }
    case USER_LIST_SUCCESS:
      return {
        isPending: false,
        users: action.payload,
      }
    case USER_LIST_FAIL:
      return {
        isPending: false,
        error: action.payload,
      }
    case USER_LIST_RESET:
      return {
        users: [],
      }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        isPending: true,
      }
    case USER_DELETE_SUCCESS:
      return {
        isPending: false,
        success: true,
      }
    case USER_DELETE_FAIL:
      return {
        isPending: false,
        error: action.payload,
      }
    default:
      return state
  }
}
