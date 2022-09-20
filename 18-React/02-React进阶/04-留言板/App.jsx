import React, { Component } from 'react'
import Add from './component/add/add'
import List from './component/list/list'

export default class MyComponent extends Component {
  // 定义评论数据
  state = {
    comments: [
      { id: '1', name: '小明', content: '挺好' },
      { id: '2', name: '小华', content: '挺好+1' },
      { id: '3', name: '小红', content: '挺好++1' }
    ]
  }

  // 添加评论(放在父组件，因为数据在哪就把操作数据的方法放在哪)
  addComment = (commentObj) => {
    /**
     * 特别注意：
     * 不能直接修改state中的数据，后期可能会产生一些问题
     */

    // 获取原状态
    // let { comments } = this.state // 不能以此种方式获取state中的数据，因为虽然拿到了原数据，但修改此数据则会导致直接修改了state中的数据
    let comments = [...this.state.comments]
    // 追加数据
    comments.unshift(commentObj)
    // 新数据维护到状态中
    this.setState({ comments })
  }

  // 删除评论
  deleteComment = (id) => {
    // 获取原状态
    let comments = [...this.state.comments]
    // 删除id指定的评论
    comments = comments.filter((item) => {
      return item.id !== id
    })
    // 新数据维护到状态中
    this.setState({ comments })
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
            <Add addComment={this.addComment} />
            <List comments={comments} deleteComment={this.deleteComment} />
          </div>
        </div>
      </div>
    )
  }
}