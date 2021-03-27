import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  ORDER_BY_USER_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  ORDER_LIST_RESET,
  ORDER_CREATE_RESET,
} from '../constants/reducerConstants.js'
import axios from 'axios'

const config = (token) => {
  if (token) {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  } else {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }
}
//
//
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    const { data } = await axios.post(
      '/users/login',
      { email, password },
      config
    )
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
    //
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
//
//
export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: ORDER_BY_USER_RESET })
  dispatch({ type: USER_LIST_RESET })
  dispatch({ type: USER_UPDATE_PROFILE_RESET })
  dispatch({ type: ORDER_LIST_RESET })
  dispatch({ type: ORDER_CREATE_RESET })
}
//
//
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })
    const { data } = await axios.post(
      '/users',
      { name, email, password },
      config
    )
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
    //
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
//
//
// if info about logged user then id ='profile else id
// export const getUserDetails = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: USER_DETAILS_REQUEST })
//     const {
//       userLogin: { userInfo },
//     } = getState()
//     const { data } = await axios.get(`/users/${id}`, config(userInfo.token))
//     dispatch({
//       type: USER_DETAILS_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     dispatch({
//       type: USER_DETAILS_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
    const { data } = await axios.put('/users/profile', user, config(user.token))
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        _id: data._id,
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        token: user.token,
      },
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfileByAdmin = (user) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const { data } = await axios.put(
      `/users/${user.userToEdit.id}`,
      user,
      config(userInfo.token)
    )
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const { data } = await axios.get('/users', config(userInfo.token))
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    await axios.delete(`/users/${id}`, config(userInfo.token))
    dispatch({
      type: USER_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
