import React from 'react'

export default function index() {
  const state = { count: 0 }

  const selectRef = React.createRef()

  const increment = () => {
    const { value } = selectRef
    console.log(selectRef, value)
  }
  const decrement = () => {
    console.log('-----------')
  }
  const incrementOfOdd = () => {
    console.log('-----------')
  }
  const incrementOfAsync = () => {
    console.log('-----------')
  }

  return (
    <div>
      <h1>当前求和为0</h1>&nbsp;
      <input type="text" ref={selectRef} />
      {/* <select>
        <option value={1}>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>&nbsp; */}
      <button onClick={increment}>+</button>&nbsp;
      <button onClick={decrement}>-</button>&nbsp;
      <button onClick={incrementOfOdd}>和为奇数时再加</button>&nbsp;
      <button onClick={incrementOfAsync}>异步求和</button>
    </div>
  )
}
