import React, { PureComponent } from 'react'
import store from '../store/index'
import { subAction } from '../store/actionCreators'

export default class subtraction extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      counter: store.getState().counter
    }
  }

  // 订阅store中数据的变化并将变化同步到state中
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
        <hr />
        <div>About</div>
        <h2>当前计数：{this.state.counter}</h2>
        <button onClick={e => this.decrement(1)}>-1</button>
        <button onClick={e => this.subNumber(5)}>-5</button>
      </div>
    )
  }

  decrement() {
    store.dispatch(subAction(1))
  }
  subNumber(num) {
    store.dispatch(subAction(num))
  }
}
