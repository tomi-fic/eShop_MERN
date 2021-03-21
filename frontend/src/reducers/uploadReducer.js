import {
  UPLOAD_IMG_REQUEST,
  UPLOAD_IMG_SUCCESS,
  UPLOAD_IMG_FAIL,
  UPLOAD_IMG_RESET,
} from '../constants/reducerConstants.js'

export const uploadHandlerReducer = (
  state = { isPending: false, img: [], error: null },
  action
) => {
  switch (action.type) {
    case UPLOAD_IMG_REQUEST:
      return {
        isPending: true,
        img: [],
      }
    case UPLOAD_IMG_SUCCESS:
      return {
        isPending: false,
        success: true,
        img: action.payload,
      }
    case UPLOAD_IMG_FAIL:
      return {
        isPending: false,
        error: action.payload,
        img: [],
      }
    case UPLOAD_IMG_RESET:
      return {
        isPending: false,
        img: [],
      }
    default:
      return state
  }
}
