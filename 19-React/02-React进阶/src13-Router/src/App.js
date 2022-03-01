import React, { PureComponent } from 'react'
import { BrowserRouter, Link, Route, NavLink, Switch, withRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import './App.css'
import Home from './pages/home'
import About from './pages/about'
import Profile from './pages/profile'
import User from './pages/user'
import Login from './pages/login'
import Product from './pages/product'
import Detail from './pages/detail1'
import Detail2 from './pages/detail2'
import Detail3 from './pages/detail3'
import NoMatch from './pages/noMatch'
import routes from './router'

class App extends PureComponent {
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
    const id = "123"
    const info = { name: "TaoLoading", age: 18, height: 1.88 }

    return (
      <div>
        {/* <BrowserRouter> */}

        {/* 1.基础路由 */}
        {/* <Link to="/">首页</Link>
          <Link to="/about">关于</Link>
          <Link to="/profile">我的</Link> */}

        {/* 2.加入样式 */}
        <NavLink exact to="/" activeClassName="link-active">首页</NavLink>
        <NavLink exact to="/about" activeClassName="link-active">关于</NavLink>
        <NavLink exact to="/profile" activeClassName="link-active">我的</NavLink>
        <NavLink exact to="/user" activeClassName="link-active">用户</NavLink>
        <NavLink exact to="/product" activeClassName="link-active">商品</NavLink>
        <NavLink to={`/detail/${id}`} activeClassName="link-active">详情(动态路由跳转)</NavLink>
        <NavLink to={`/detail2?name=why&age=18`} activeClassName="link-active">详情2(字符串)</NavLink>
        <NavLink to={{ pathname: "/detail3", search: "name=abc", state: info }} activeClassName="link-active">详情3(对象)</NavLink>
        <NavLink exact to="/nothing" activeClassName="link-active">未匹配路由</NavLink>

        {/* 3.使用Switch实现只匹配一次 */}
        {/* <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/user" component={User} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/product" component={Product} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route path="/detail2" component={Detail2} />
          <Route path="/detail3" component={Detail3} />
          <Route component={NoMatch} />
        </Switch> */}

        {/* </BrowserRouter> */}

        {/* 4.使用路由文件 */}
        {renderRoutes(routes)}
      </div>
    )
  }
}

export default withRouter(App)
