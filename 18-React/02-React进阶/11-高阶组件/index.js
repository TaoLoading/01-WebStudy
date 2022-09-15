import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const root = ReactDOM.createRoot(<App name="LHT" />, document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)