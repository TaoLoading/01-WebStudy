import React, { Component } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'

export default class App extends Component {
  /**
   * 1. 安装react-router：npm i react-router-dom
   * 2. 使用Link或NavLink完成路由链接的跳转，NavLink可使用activeClassName属性设置样式
   * 3. 使用Route完成路由页面的跳转，外部需要包裹一层Routes
   * 注：Link、NavLink、Routes、Route最外层需要包裹一层BrowserRouter
   * 4. 路由匹配时是模糊匹配，加上exact后为精准匹配
   */

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <h2>React Router Demo</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 使用activeClassName报错 */}
              {/* <NavLink className="list-group-item" to="/about" activeClassName="demo">About</NavLink>
                <NavLink className="list-group-item" to="/home" activeClassName="demo">Home</NavLink> */}
              <NavLink className="list-group-item" to="/about">About</NavLink>
              <NavLink className="list-group-item" to="/home">Home</NavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/home" element={<Home />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}