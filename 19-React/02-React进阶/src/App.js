import React, { Component } from 'react'
import Add from './component/add/add.jsx'
import List from './component/list/list.jsx'

export default class MyComponent extends Component {
  render() {
    return (
      <div id="root">
        <div>
          <header className="site-header jumbotron">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <h1>请发表对React的评论</h1>
                </div>
              </div>
            </div>
          </header>
          <div className="container">
            <Add />
            <List />
          </div>
        </div>
      </div>
    )
  }
}