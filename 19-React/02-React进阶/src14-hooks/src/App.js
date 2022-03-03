import React, { useState, createContext } from 'react'
import CustomContextShareHook from './11-自定义Hook/02-自定义Hook练习-Context共享'

export const UserContext = createContext()
export const ThemeContext = createContext()
export const TokenContext = createContext()

function App() {
  const [show, setShow] = useState(true)

  return (
    <div>
      {/* <CustomContextShareHook /> */}

      {/* 验证组件卸载时取消事件订阅，见03文件 */}
      {/* {show && <EffectHookCancelDemo />} */}
      {/* <button onClick={e => setShow(!show)}>切换</button> */}

      <UserContext.Provider value={{ name: 'TaoLoading', age: 18 }}>
        <TokenContext.Provider value='123456'>
          <CustomContextShareHook />
        </TokenContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

export default App
