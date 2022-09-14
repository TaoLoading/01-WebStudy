import React, { Component } from 'react'

/**
 * 为什么setState是异步更新的：
 * 1.可以显著提高性能。将多次setState合并为一次，避免了render函数的多次调用，减少了页码的渲染次数
 * 2.使state和props保持一致。
 *     若setState为同步更新，则可能会导致setState已经更新而render函数还未执行，
 *     当render中有子组件并使用props进行传值时，由于render函数还未执行则导致传入props中的值为更新之前的值，
 *     此时则违背了state和props保持一致的原则
 * 
 * 
 * 获取setState异步更新后的数据：
 * 1.方式一
 *     在this.setState更新时传入一个回调函数，this.setState({}, () => {})，在传入的回调函数中获取值
 * 2.方式二
 *     在componentDidUpdate()获取值
 */

function Home(props) {
  // Hello World
  return <h1>{props.message}</h1>
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'Hello World'
    }
  }

  render() {
    return (
      <div>
        <h2>当前计数: {this.state.message}</h2>
        <button onClick={e => this.changeText()}>改变文本</button>
        <Home message={this.state.message} />
      </div>
    )
  }

  componentDidUpdate() {
    // 方式二: 获取异步更新的state
    console.log(this.state.message)
  }

  changeText() {
    // 2.setState是异步更新
    // this.setState({
    //   message: '你好啊,李银河'
    // })
    // console.log(this.state.message) // Hello World

    // 方式一: 获取异步更新后的数据
    // setState(更新的state, 回调函数)
    this.setState({
      message: '你好啊,李银河'
    }, () => {
      console.log(this.state.message)
    })
  }
}
