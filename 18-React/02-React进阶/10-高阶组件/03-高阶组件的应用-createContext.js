import React, { PureComponent, createContext } from 'react'

/**
 * 需求分析：
 * 当使用createContext实现02文件类似需求时，会产生大量重复代码，
 * 如每个子组件都要在<UserContext.Consumer>编写类似的代码，使用高阶组件实现代码的复用
 * 
 * 实现方式：
 * 使用高阶函数返回<UserContext.Consumer>代码，并对其中的传值做处理以提高组件使用灵活性
 * 
 * 使用高阶组件复用的代码(即子组件中的<UserContext.Consumer>)：
 * <UserContext.Consumer>
 *   {
 *     user => {
 *       return <h2>Home: {`昵称: ${user.nickname} 等级: ${user.level} 区域: ${user.region}`}</h2>
 *     }
 *   }
 * </UserContext.Consumer>
 */

// 1.创建Context
const UserContext = createContext({
  nickname: '默认',
  level: -1,
  区域: '中国'
})

// 2.创建子组件
class Home extends PureComponent {
  render() {
    return <h2>Home: {`昵称: ${this.props.nickname} 等级: ${this.props.level} 区域: ${this.props.region}`}</h2>
  }
}
class About extends PureComponent {
  render() {
    return <h2>About: {`昵称: ${this.props.nickname} 等级: ${this.props.level} 区域: ${this.props.region}`}</h2>
  }
}
class Detail extends PureComponent {
  render() {
    return (
      <ul>
        <li>{this.props.nickname}</li>
        <li>{this.props.level}</li>
        <li>{this.props.region}</li>
      </ul>
    )
  }
}

// 3.创建高阶组件
function withUser(WrappedComponent) {
  return props => {
    return (
      <UserContext.Consumer>
        {
          user => {
            // 传递了所有接受到的props和后添加的user
            return <WrappedComponent {...props} {...user} />
          }
        }
      </UserContext.Consumer>
    )
  }
}

// 4.使用高阶组件处理子组件
const UserHome = withUser(Home)
const UserAbout = withUser(About)
const UserDetail = withUser(Detail)

class App extends PureComponent {
  render() {
    return (
      <div>
        App
        <UserContext.Provider value={{ nickname: "why", level: 90, region: "中国" }}>
          <UserHome />
          <UserAbout />
          <UserDetail />
        </UserContext.Provider>
      </div>
    )
  }
}

export default App
