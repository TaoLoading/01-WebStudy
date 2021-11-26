import React, { Component } from 'react'
import './item.css'

export default class MyComponent extends Component {
  render() {
    return (
      <li className="list-group-item">
        <div className="handle">
          <a href="#1">删除</a>
        </div>
        <p className="user"><span >yyy</span><span>说:</span></p>
        <p className="centence">React有点难!</p>
      </li>
    )
  }
}