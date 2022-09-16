import React, { Component } from 'react'

/**
 * Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。
 * 
 * 使用Context进行通信：
 * 1.创建Context共享对象
 *   (1) React.createContext
 * 2.订阅context的变化
 *   (1) 在需要接收数据的组件外侧使用 "Context共享对象名称.Provider" 的标签进行包裹
 *   (2) 在标签内部使用 "value={数据}" 的方式进行值的传递
 *   注：当为将组件外侧进行标签的包裹时，则展示的数据时共享对象中的默认数据；包裹时则展示的是Provider中提供的值
 * 3.读取值
 *   (1) 使用 "接收数据组件名称.contextType = Context共享对象名称" 将Context共享对象赋值给接收数据组件的contextType
 *   (2) 在接收数据组件的内部使用 "this.context.属性" 的形式读取值
 * 
 * 注：此种方法下，接收数据的组件为类组件
 */

// 创建Context对象
const UserContext = React.createContext({
  nickname: 'HT',
  level: 100
})

class ProfileHeader extends Component {
  render() {
    console.log(this.context)
    return (
      <div>
        <h2>用户昵称: {this.context.nickname}</h2>
        <h2>用户等级: {this.context.level}</h2>
      </div>
    )
  }
}

ProfileHeader.contextType = UserContext;

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
      nickname: 'LHT',
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
