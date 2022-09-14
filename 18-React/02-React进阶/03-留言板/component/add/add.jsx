import React, { Component } from 'react'
import uuid from 'uuid'

export default class Add extends Component {
  // 添加评论
  add = () => {
    let { addComment } = this.props
    // 获取用户输入
    let name = this.name.value
    let content = this.content.value
    // 校验输入内容
    if (!name.trim() || !content.trim()) {
      alert('名称或内容不能为空')
    }
    // 添加评论
    addComment({ id: uuid(), name, content })
    // 清空输入
    this.name.value = ''
    this.content.value = ''
  }

  render() {
    return (
      <div className="col-md-4">
        <form className="form-horizontal">
          <div className="form-group">
            <label>用户名</label>
            <input type="text" className="form-control" placeholder="用户名" ref={(name) => { this.name = name }} />
          </div>
          <div className="form-group">
            <label>评论内容</label>
            <textarea className="form-control" rows="6" placeholder="评论内容" ref={(content) => { this.content = content }}></textarea>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button onClick={this.add} type="button" className="btn btn-default pull-right">提交</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}