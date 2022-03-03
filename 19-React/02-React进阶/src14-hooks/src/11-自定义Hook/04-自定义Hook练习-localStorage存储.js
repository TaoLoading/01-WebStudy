import React, { useState, useEffect } from 'react'

import useLocalStorage from '../hooks/local-store-hook'

export default function CustomDataStoreHook() {
  const [name, setName] = useLocalStorage('name')

  return (
    <div>
      <h2>CustomDataStoreHook: {name}</h2>
      <button onClick={e => setName('TaoLoading')}>设置name</button>
    </div>
  )
}
