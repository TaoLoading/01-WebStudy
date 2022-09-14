import React, { PureComponent } from 'react'
// 用于创建时间总线
import { EventEmitter } from 'events'

// 事件总线: event bus
const eventBus = new EventEmitter()

class Home extends PureComponent {
  componentDidMount() {
    // 添加事件监听
    eventBus.addListener('sayHello', this.handleSayHelloListener)
  }

  componentWillUnmount() {
    // 取消事件监听
    eventBus.removeListener('sayHello', this.handleSayHelloListener)
  }

  handleSayHelloListener(num, message) {
    console.log(num, message);
  }

  render() {
    return (
      <div>
        Home

      </div>
    )
  }
}

class Profile extends PureComponent {
  render() {
    return (
      <div>
        Profile
        <button onClick={e => this.emitEvent()}>点击了profile按钮</button>
      </div>
    )
  }

  emitEvent() {
    // 发出事件
    eventBus.emit('sayHello', 123, 'Hello Home')
  }
}

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Home />
        <Profile />
      </div>
    )
  }
}

