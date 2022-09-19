import { Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Message from '../pages/Message'
import News from '../pages/News'

const routes = [
  {
    path: '/',
    element: <Navigate to="about" />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'news',
        element: <News />
      },
      {
        path: 'message',
        element: <Message />
      }
    ]
  },
  {
    path: '/about',
    element: <About />
  }
]

export default routes
