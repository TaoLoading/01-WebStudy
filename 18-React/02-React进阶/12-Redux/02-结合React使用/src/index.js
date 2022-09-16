import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
// import StoreContext from './util/context'
import { Provider } from 'react-redux'
import store from './store/index'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* 使用自己封装的StoreContext，见03文件 */}
    {/* <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>, */}
    {/* 使用react-redux */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
