import React, { useState, useCallback, memo } from 'react'

/**
 * useCallback在什么时候使用？
 * 场景: 在将一个组件中的函数, 传递给子元素进行回调使用时, 使用useCallback对函数进行处理
 */

const HYButton = memo((props) => {
  console.log('HYButton重新渲染: ' + props.title)
  return <button onClick={props.increment}>HYButton +1</button>
})

export default function CallbackHookDemo02() {
  console.log('CallbackHookDemo02重新渲染')

  const [count, setCount] = useState(0)
  const [show, setShow] = useState(true)

  const increment1 = () => {
    console.log('执行increment1函数')
    setCount(count + 1)
  }

  const increment2 = useCallback(() => {
    console.log('执行increment2函数')
    setCount(count + 1)
  }, [count])

  return (
    <div>
      <h2>CallbackHookDemo01: {count}</h2>
      {/* <button onClick={increment1}>+1</button>
      <button onClick={increment2}>+1</button> */}
      <HYButton title="btn1" increment={increment1} />
      <HYButton title="btn2" increment={increment2} />

      <button onClick={e => setShow(!show)}>show切换</button>
    </div>
  )
}
