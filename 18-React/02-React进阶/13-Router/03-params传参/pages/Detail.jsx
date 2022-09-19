import React from 'react'
import { useParams } from 'react-router-dom'

export default function Detail() {
  const { id, title, content } = useParams()
  return (
    <ul>
      <li>ID:{id}</li>
      <li>标题：{title}</li>
      <li>内容：{content}</li>
    </ul>
  )
}
