import React, { Component } from 'react'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'

export default class App extends Component {
  /**
   * 1. 安装react-router-dom
   * 2. 使用Link或NavLink完成路由链接的跳转，NavLink可使用activeClassName属性设置样式
   * 3. 使用Route完成路由页面的跳转，外部需要包裹一层Routes
   * 4. 路由匹配时是模糊匹配，匹配上后不会再向下继续匹配，加上exact后为精准匹配
   * 
   * 注：index文件中App最外层需要包裹一层BrowserRouter
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
              {/* 路由链接 */}
              <NavLink className="list-group-item" to="/about">About</NavLink>
              <NavLink className="list-group-item" to="/home">Home</NavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由 */}
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/" element={<Navigate to="/about" />}></Route>
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}