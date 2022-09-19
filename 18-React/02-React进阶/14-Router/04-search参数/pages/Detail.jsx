import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Detail() {
  const [search] = useSearchParams()
  const id = search.get('id')
  const title = search.get('title')
  const content = search.get('content')
  return (
    <ul>
      <li>ID：{id}</li>
      <li>标题：{title}</li>
      <li>内容：{content}</li>
    </ul>
  )
}
