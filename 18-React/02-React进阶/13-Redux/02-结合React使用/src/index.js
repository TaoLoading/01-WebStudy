import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import StoreContext from './util/context'
import { Provider } from 'react-redux'
import store from './store/index'

ReactDOM.render(
  // 使用自己封装的StoreContext，见03文件
  /* <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>, */
  // 使用react-redux
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
