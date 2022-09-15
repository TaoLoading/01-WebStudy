import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
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
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
