import {
  ORDER_BY_USER_FAIL,
  ORDER_BY_USER_REQUEST,
  ORDER_BY_USER_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../constants/reducerConstants'
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

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await axios.post(`/orders`, order, config(userInfo.token))
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await axios.get(`/orders/${id}`, config(userInfo.token))
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const payOrder = (orderId, payRes) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await axios.put(
      `/orders/${orderId}/pay`,
      payRes,
      config(userInfo.token)
    )
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_BY_USER_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await axios.get(`/orders/myorders`, config(userInfo.token))
    dispatch({
      type: ORDER_BY_USER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_BY_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await axios.get(`/orders`, config(userInfo.token))
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
