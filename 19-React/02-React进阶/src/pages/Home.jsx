import React, { Component } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import HomeMessage from './homeMessage'
import HomeNews from './homeNews'

export default class Home extends Component {
  render() {
    return (
      <div className="panel">
        <div className="panel-body">
          <div><h2>Home组件内容</h2>
            <div>
              <ul className="nav nav-tabs">
                <li>
                  <NavLink className="list-group-item" to="/home/news">News</NavLink>
                </li>
                <li>
                  <NavLink className="list-group-item active" to="/home/message">Message</NavLink>
                </li>
              </ul>
              {/* message 和 news 组件 */}
              <Routes>
                <Route path="/home/message" component={<HomeMessage />} />
                <Route path="/home/news" component={<HomeNews />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    )
  }
}