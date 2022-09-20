import React, { Component } from 'react'

export default class index extends Component {
  state = { count: 0 }

  increment = () => {
    const { value } = this.selectNumber
    const { count } = this.state
    this.setState({ count: count + value * 1 })
  }
  decrement = () => {
    const { value } = this.selectNumber
    const { count } = this.state
    this.setState({ count: count - value * 1 })
  }
  incrementOfOdd = () => {
    const { count } = this.state
    if (count % 2 === 0) return
    const { value } = this.selectNumber
    this.setState({ count: count + value * 1 })
  }
  incrementOfAsync = () => {
    const { value } = this.selectNumber
    const { count } = this.state
    setTimeout(() => {
      this.setState({ count: count + value * 1 })
    }, 1000)
  }

  render() {
    return (
      <div>
        <h1>当前求和为{this.state.count}</h1>&nbsp;
        <select ref={c => this.selectNumber = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementOfOdd}>和为奇数时再加</button>&nbsp;
        <button onClick={this.incrementOfAsync}>异步和</button>
      </div>
    )
  }
}
