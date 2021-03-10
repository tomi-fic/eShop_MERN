import axios from 'axios'
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
} from '../constants/reducerConstants.js'
import { getHeadersConfig } from '../utils/getHeadersConfig.js'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_PENDING })
    const { data } = await axios.get('/products')
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const productDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_PENDING })
    const { data } = await axios.get(`/products/${id}`)
    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    await axios.delete(`/products/${id}`, getHeadersConfig(userInfo.token))
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    await axios.put(
      `/products/${product.id}`,
      product,
      getHeadersConfig(userInfo.token)
    )
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    await axios.post(`/products`, product, getHeadersConfig(userInfo.token))
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
