import React, { Component } from 'react'

/**
 * 当接收数据的组件为函数式组件时，则不能使用 "接收数据组件名称.contextType = Context共享对象名称"，
 * 此时对函数式组件内部进行改造：
 * 1.函数内部使用箭头函数进行改造(如下方ProfileHeader中的value)，外层套一层大括号，再在外层使用 "Context共享对象名称.Consumer" 标签进行包裹
 * 2.此时value为Provider中提供的值，直接通过 "value.属性名" 的形式进行数据的读取
 */

const UserContext = React.createContext({
  nickname: 'HT2',
  level: 100
})

function ProfileHeader() {
  return (
    <UserContext.Consumer>
      {
        value => {
          return (
            <div>
              <h2>用户昵称: {value.nickname}</h2>
              <h2>用户等级: {value.level}</h2>
            </div>
          )
        }
      }
    </UserContext.Consumer>
  )
}

function Profile(props) {
  return (
    <div>
      <ProfileHeader />
      <ul>
        <li>设置1</li>
        <li>设置2</li>
        <li>设置3</li>
        <li>设置4</li>
      </ul>
    </div>
  )
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: 'LHT2',
      level: 99
    }
  }

  render() {
    return (
      <div>
        <UserContext.Provider value={this.state}>
          <Profile />
        </UserContext.Provider>
      </div>
    )
  }
}
