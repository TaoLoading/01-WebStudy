import React, { useState, createContext } from 'react'
import MemoHookDemo02 from './07-useMemo使用/02-useMemo传入子组件应用类型'

export const UserContext = createContext()
export const ThemeContext = createContext()
export const TokenContext = createContext()

function App() {
  const [show, setShow] = useState(true)

  return (
    <div>
      <MemoHookDemo02 />

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
