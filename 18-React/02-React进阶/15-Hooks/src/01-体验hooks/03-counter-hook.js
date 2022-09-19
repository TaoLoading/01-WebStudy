import React, { useState } from 'react'

export default function CounterHook() {
  const [count, setCount] = useState(() => 10)

  console.log('CounterHook渲染')

  function handleBtnClick() {
    // setCount(count + 10)
    // setCount(count + 10)
    // setCount(count + 10)
    // setCount(count + 10)
    setCount((prevCount) => prevCount + 10)
    setCount((prevCount) => prevCount + 10)
    setCount((prevCount) => prevCount + 10)
    setCount((prevCount) => prevCount + 10)
  }

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <button onClick={e => setCount((prevCount) => prevCount + 10)}>+10</button>
      <button onClick={handleBtnClick}>+10</button>
      <button onClick={e => setCount(count - 1)}>-1</button>
    </div>
  )
}
