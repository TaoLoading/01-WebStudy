import React, { PureComponent } from 'react'
import store from '../store/index'
import { addAction } from '../store/actionCreators'

export default class addition extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      counter: store.getState().counter
    }
  }

  // 订阅store中数据的变化
  componentDidMount() {
    // store.subscribe()返回值是一个函数，调用即可卸载订阅
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        counter: store.getState().counter
      })
    })
  }
  // 卸载订阅
  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <div>
        <div>Home</div>
        <h2>当前计数：{this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.addNumber(5)}>+5</button>
      </div>
    )
  }

  increment() {
    store.dispatch(addAction(1))
  }
  addNumber(num) {
    store.dispatch(addAction(num))
  }
}
