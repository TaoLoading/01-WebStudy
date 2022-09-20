import React, { Component } from 'react'
import Search from './components/search/search'
import List from './components/list/list'

export default class App extends Component {
  /**
   * 利用PubSub实现消息订阅发布机制
   * 订阅：PubSub.subscribe('消息名', () => {})
   * 发布：PubSub.publish('消息名', data)
   */

  render() {
    return (
      <div className="container">
        <section className="jumbotron">
          <h3 className="jumbotron-heading">搜索github用户</h3>
          {/* search组件 */}
          <Search />
        </section>
        {/* list组件 */}
        <List />
      </div>
    )
  }
}