import React, { Component } from 'react'
import { NavLink, BrowserRouter } from 'react-router-dom'

export default class App extends Component {
  /**
   * 1.安装react-router：npm i react-router-dom
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
              <BrowserRouter>
                <NavLink className="list-group-item" to="/about" activeClassName="demo">About</NavLink>
                <NavLink className="list-group-item" to="/home" activeClassName="demo">Home</NavLink>
              </BrowserRouter>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                <h3>我是About的内容</h3>
                <h3>我是Home的内容</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}