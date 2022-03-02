import React, { useState, createContext } from 'react'
import MultiEffectHookDemo from './03-useEffect使用/04-多useEffect一起使用'

function App() {
  const [show, setShow] = useState(true)

  return (
    // <div style={{ textAlign: "center", padding: "30px" }}>
    <div>
      <MultiEffectHookDemo />

      {/* 验证组件卸载时取消事件订阅，见03文件 */}
      {/* {show && <EffectHookCancelDemo />} */}

      <button onClick={e => setShow(!show)}>切换</button>
    </div>
  )
}

export default App