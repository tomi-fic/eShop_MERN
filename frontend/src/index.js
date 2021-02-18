import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './assets/css/bootstrap.min.css'
import './assets/css/index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store.js'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
