import React from 'react'
import Count from './containers/Count'
import Person from './containers/Person'

export default function App() {
  return (
    <div style={{ margin: '20px' }}>
      <Count />
      <hr />
      <Person />
    </div>
  )
}
