import React, { useState, useEffect } from 'react'

export default function MultiEffectHookDemo() {
  const [count, setCount] = useState(0)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    console.log('修改DOM', count)
  }, [count])

  useEffect(() => {
    console.log('订阅事件')
  }, [])

  useEffect(() => {
    console.log('网络请求')
  }, [])

  return (
    <div>
      <h2>MultiEffectHookDemo</h2>
      <h2>{count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <h2>{isLogin ? 'TaoLoading' : '未登录'}</h2>
      <button onClick={e => setIsLogin(!isLogin)}>登录/注销</button>
    </div>
  )
}
