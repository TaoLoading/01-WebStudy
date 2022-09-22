import React from 'react'
import store from './redux/store'
import Count from './containers/Count'

export default function App() {
  return (
    <Count store={store} />
  )
}
