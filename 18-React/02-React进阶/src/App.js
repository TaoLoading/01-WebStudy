import React, { Component } from 'react'
import Search from './components/search/search.jsx'
import List from './components/list/list.jsx'

export default class MyComponent extends Component {
  state = {
    user: [],
    isFirst: true,
    isLoading: false,
    error: ''
  }

  // 更新状态
  updateState = (obj) => {
    this.setState(obj)
  }

  render() {
    return (
      <div className="container">
        <section className="jumbotron">
          <h3 className="jumbotron-heading">搜索github用户</h3>
          {/* search组件 */}
          <Search updateState={this.updateState} />
        </section>
        {/* list组件 */}
        <List {...this.state} />
      </div>
    )
  }
}