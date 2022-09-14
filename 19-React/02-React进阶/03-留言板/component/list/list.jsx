import React, { Component } from 'react'
import Item from '../item/item.jsx'
import './list.css'

export default class List extends Component {
  render() {
    let { comments, deleteComment } = this.props

    return (
      <div className="col-md-8">
        <h3 className="reply">评论回复：</h3>
        <h2 style={{ display: comments.length === 0 ? 'block' : 'none' }}>暂无评论，点击左侧添加评论！！！</h2>
        <ul className="list-group">
          {
            comments.map((item) => {
              // 向子组件传参，注意此处使用了三点运算符减少编码
              // return <Item key={item.id} name={item.name} content={item.content} />
              return <Item key={item.id} {...item} deleteComment={deleteComment} />
            })
          }
        </ul>
      </div>
    )
  }
}