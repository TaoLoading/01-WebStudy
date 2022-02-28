import React, { PureComponent } from 'react'
import { BrowserRouter, Link, Route, NavLink, Switch, withRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import About from './pages/about'
import Profile from './pages/profile'
import User from './pages/user'
import Login from './pages/login'
import NoMatch from './pages/noMatch'

export default class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      links: [
        { to: "/", title: "首页" },
        { to: "/about", title: "关于" },
        { to: "/profile", title: "我的" },
      ]
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          {/* 1.基础路由 */}
          {/* <Link to="/">首页</Link>
          <Link to="/about">关于</Link>
          <Link to="/profile">我的</Link> */}

          {/* 2.加入样式 */}
          <NavLink exact to="/" activeClassName="link-active">首页</NavLink>
          <NavLink exact to="/about" activeClassName="link-active">关于</NavLink>
          <NavLink exact to="/profile" activeClassName="link-active">我的</NavLink>
          <NavLink exact to="/user" activeClassName="link-active">用户</NavLink>
          <NavLink exact to="/nothing" activeClassName="link-active">未匹配路由</NavLink>

          {/* 3.使用Switch实现只匹配一次 */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/user" component={User} />
            <Route exact path="/login" component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
