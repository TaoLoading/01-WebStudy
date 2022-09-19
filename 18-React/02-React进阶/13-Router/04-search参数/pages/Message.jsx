import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Message() {
  const [messages] = useState([
    { id: '1', title: '消息1', content: '内容1' },
    { id: '2', title: '消息2', content: '内容2' },
    { id: '3', title: '消息3', content: '内容3' },
  ])
  return (
    <div>
      <ul>
        {
          messages.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`detail?id=${item.id}&title=${item.title}&content=${item.content}`}>{item.content}</Link>
              </li>
            )
          })
        }
      </ul>
      <hr />
      {/* 指定路由展示的位置 */}
      <Outlet />
    </div>
  )
}
