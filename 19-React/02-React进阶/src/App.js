import React, { Component } from 'react'
import Add from './component/add/add.jsx'
import List from './component/list/list.jsx'

export default class MyComponent extends Component {
  // 定义评论数据
  state = {
    comments: [
      { id: '1', name: '小明', content: '挺好' },
      { id: '2', name: '小华', content: '挺好+1' },
      { id: '3', name: '小红', content: '挺好++1' }
    ]
  }

  render() {
    let { comments } = this.state
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
            <List comments={comments} />
          </div>
        </div>
      </div>
    )
  }
}