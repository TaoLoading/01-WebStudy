import React, { Component } from 'react'
import './item.css'

export default class MyComponent extends Component {
  render() {
    let { name, content } = this.props

    return (
      <li className="list-group-item">
        <div className="handle">
          <a href="#1">删除</a>
        </div>
        <p className="user"><span >{name}</span><span>说:</span></p>
        <p className="centence">{content}</p>
      </li>
    )
  }
}