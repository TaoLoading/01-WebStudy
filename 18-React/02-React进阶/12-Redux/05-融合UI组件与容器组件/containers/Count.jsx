import React, { Component } from 'react'
// 用于连接UI组件与redux
import { connect } from 'react-redux'
import { incrementAction, incrementAsyncAction, decrementAction } from '../redux/actions'

// 定义UI组件
class Count extends Component {
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

// 定义容器组件
export default connect(
  // mapStateToProps，用于映射状态
  // 此处的值传入UI组件中，UI组件可使用this.props.xxx拿到对应的值
  state => ({
    count: state
  }),
  // mapDispatchToProps，用于映射操作状态的方法
  {
    add: incrementAction,
    addAsync: incrementAsyncAction,
    reduce: decrementAction
  }
)(Count)
