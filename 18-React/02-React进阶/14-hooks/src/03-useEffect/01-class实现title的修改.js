import React, { PureComponent } from 'react'

export default class ClassCounterTitleChange extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    }
  }

  componentDidMount() {
    // 1.修改DOM
    document.title = this.state.counter
    // 2.订阅事件
    console.log('订阅一些事件')
    // 3.网络请求
    console.log('发送一些网络请求')
  }
  componentWillUnmount() {
    console.log('取消事件订阅')
  }
  componentDidUpdate() {
    document.title = this.state.counter
  }

  render() {
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.setState({ counter: this.state.counter + 1 })}>+1</button>
      </div>
    )
  }
}
