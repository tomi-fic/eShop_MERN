import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {
  productListReducer,
  productDetailReducer,
} from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'
// DEV
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
})
const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
}
const middleware = [thunkMiddleware]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
