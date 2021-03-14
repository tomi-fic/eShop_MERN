import {
  UPLOAD_IMG_REQUEST,
  UPLOAD_IMG_SUCCESS,
  UPLOAD_IMG_FAIL,
  UPLOAD_IMG_RESET,
} from '../constants/reducerConstants.js'
import axios from 'axios'
import { getHeaderFileConfig } from '../utils/getHeadersConfig'

export const uploadImg = (img) => async (dispatch, getState) => {
  try {
    const formData = new FormData()
    formData.append('image', img)
    dispatch({ type: UPLOAD_IMG_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const { data } = await axios.post(
      '/upload',
      formData,
      getHeaderFileConfig(userInfo.token)
    )
    dispatch({
      type: UPLOAD_IMG_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPLOAD_IMG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const uploadImgs = (imgs) => async (dispatch, getState) => {
  try {
    const formData = new FormData()
    for (var imgIndex in imgs) {
      if (!isNaN(imgIndex)) {
        formData.append('images', imgs[imgIndex])
      }
    }
    //
    dispatch({ type: UPLOAD_IMG_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const { data } = await axios.post(
      '/upload',
      formData,
      getHeaderFileConfig(userInfo.token)
    )
    dispatch({
      type: UPLOAD_IMG_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPLOAD_IMG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const resetImgHandler = (dispatch) => {
  dispatch({
    type: UPLOAD_IMG_RESET,
  })
}
