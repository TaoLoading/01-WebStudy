import React, { Component } from 'react'
import Search from './components/search/search.jsx'
import List from './components/list/list.jsx'

export default class App extends Component {
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