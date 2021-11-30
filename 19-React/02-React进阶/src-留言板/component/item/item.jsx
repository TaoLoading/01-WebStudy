import React, { Component } from 'react'
import './item.css'

export default class Item extends Component {
  // 删除评论
  delete = (id) => {
    let { deleteComment } = this.props
    if (window.confirm('是否删除该评论？')) { // 因为confirm是window上的，而箭头函数的this是外层的this，故需要使用window.confirm
      deleteComment(id)
    }
  }

  render() {
    let { id, name, content } = this.props

    return (
      <li className="list-group-item">
        <div className="handle">
          {/* 不能写成onClick={this.delete(id)}，因为加括号后默认调用，通过包裹一层箭头函数的方式解决 */}
          <a href="#1" onClick={() => { this.delete(id) }}>删除</a>
        </div>
        <p className="user"><span >{name}</span><span>说:</span></p>
        <p className="centence">{content}</p>
      </li>
    )
  }
}