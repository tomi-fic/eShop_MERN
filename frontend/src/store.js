import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {
  productListReducer,
  productDetailReducer,
} from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'
import {
  userLoginReducer,
  userRegisterReducer,
  // userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers.js'
// DEV
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  // userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
})
const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
  },
  userLogin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
}
const middleware = [thunkMiddleware]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
