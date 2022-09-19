import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Detail() {
  const { state: { id, title, content } } = useLocation()
  return (
    <ul>
      <li>ID：{id}</li>
      <li>标题：{title}</li>
      <li>内容：{content}</li>
    </ul>
  )
}
