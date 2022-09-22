/**
 * 此文件为Count组件的UI组件(具体见react-redux模型图)
 */

import React, { Component } from 'react'

export default class index extends Component {
  // 加
  increment = () => {
    const { value } = this.selectNumber
    this.props.add(value)
  }
  // 减
  decrement = () => {
    const { value } = this.selectNumber
    this.props.reduce(value)
  }
  // 和为奇数时再加
  incrementOfOdd = () => {
    if (this.props.count % 2 === 0) return
    const { value } = this.selectNumber
    this.props.add(value)
  }
  // 异步加
  incrementOfAsync = () => {
    const { value } = this.selectNumber
    this.props.addAsync(value, 1000)
  }

  render() {
    return (
      <div>
        <h1>当前求和为{this.props.count}</h1>&nbsp;
        <select ref={c => this.selectNumber = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementOfOdd}>和为奇数时再加</button>&nbsp;
        <button onClick={this.incrementOfAsync}>异步加</button>
      </div>
    )
  }
}
