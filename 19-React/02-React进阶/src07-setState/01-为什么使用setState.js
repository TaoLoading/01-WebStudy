import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
      </div>
    )
  }

  increment() {
    /**
     * React中没有类似Vue2中Object.defineProperty的方式监听数据的变化，
     * 导致直接使用"this.state.xx"进行修改时React不知道数据已经发生了变化，
     * 导致不会进行页面的重新渲染
     */
    // this.state.counter += 1;
    // console.log(this.state.counter);
    this.setState({
      counter: this.state.counter + 1
    })
  }
}
