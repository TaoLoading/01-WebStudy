import React, { useState } from 'react'

export default function CounterHook() {
  /**
   * Hook: useState
   *  > 本身是一个函数, 来自react包
   *  > 参数和返回值
   *    1.参数: 作用是给创建出来的状态一个默认值
   *    2.返回值: 数组
   *      * 元素1: 当前state的值
   *      * 元素2: 新函数，用于设置新的值
   */
  const arr = useState(0)
  const state = arr[0]
  const setState = arr[1]

  return (
    <div>
      <h2>当前计数: {state}</h2>
      <button onClick={e => setState(state + 1)}>+1</button>
      <button onClick={e => setState(state - 1)}>-1</button>
    </div>
  )
}
