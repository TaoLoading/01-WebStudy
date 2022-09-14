import Home from '../pages/home'
import About, { AboutHistory, AboutCulture, AboutContact, AboutJoin } from '../pages/about'
import Profile from '../pages/profile'
import User from '../pages/user'

const routes = [
  {
    path: '/',
    // 精准匹配
    exact: true,
    component: Home
  },
  {
    path: '/about',
    component: About,
    // 子路由
    routes: [
      {
        path: '/about',
        exact: true,
        component: AboutHistory
      },
      {
        path: '/about/culture',
        component: AboutCulture
      },
      {
        path: '/about/contact',
        component: AboutContact
      },
      {
        path: '/about/join',
        component: AboutJoin
      },
    ]
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/user',
    component: User
  }
]

export default routes