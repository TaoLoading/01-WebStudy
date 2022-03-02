import React, { useState, createContext } from 'react'
import CallbackHookDemo02 from './06-useCallback使用/02-useCallback进行的性能优化'

export const UserContext = createContext()
export const ThemeContext = createContext()
export const TokenContext = createContext()

function App() {
  const [show, setShow] = useState(true)

  return (
    <div>
      <CallbackHookDemo02 />

      {/* 验证组件卸载时取消事件订阅，见03文件 */}
      {/* {show && <EffectHookCancelDemo />} */}
      {/* <button onClick={e => setShow(!show)}>切换</button> */}

      {/* <UserContext.Provider value={{ name: 'TaoLoading', age: 18 }}>
        <ThemeContext.Provider value={{ fontSize: '30px', color: 'red' }}>
          <ContextHookDemo />
        </ThemeContext.Provider>
      </UserContext.Provider> */}
    </div>
  )
}

export default App