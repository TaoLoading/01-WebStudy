import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './transition/CSSTransition.css'
import 'antd/dist/antd.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
