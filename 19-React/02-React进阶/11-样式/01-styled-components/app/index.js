import React, { PureComponent } from 'react'
import Home from '../home'
import Profile from '../profile'
import styled, { ThemeProvider } from 'styled-components'

// 通过'styled-components'使用js语法写css
// 返回一个react组件，组件的标签为'styled.标签名'中规定的标签
// 涉及ES6语法：通过模板字符串的方式对函数进行调用
const HYButton = styled.button`
  padding: 10px 20px;
  border-color: red;
  color: red;
`

// styled-components支持样式继承
const HYPrimaryButton = styled(HYButton)`
  color: #fff;
  background-color: green;
`

export default class App extends PureComponent {
  render() {
    return (
      // styled-components中的ThemeProvider实现了createContext一系列功能，并自动将传入的参数进行共享到其引用的组件
      <ThemeProvider theme={{ themeColor: "red", fontSize: "30px" }}>
        <Home />
        <hr />
        <Profile />
        <HYButton>我是普通的按钮</HYButton>
        <HYPrimaryButton>我是主要的按钮</HYPrimaryButton>
      </ThemeProvider>
    )
  }
}
