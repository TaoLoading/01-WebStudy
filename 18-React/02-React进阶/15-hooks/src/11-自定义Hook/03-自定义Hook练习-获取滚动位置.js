import React, { useEffect, useState } from 'react'
import useScrollPosition from '../hooks/scroll-position-hook'

export default function CustomScrollPositionHook() {
  const position = useScrollPosition()

  return (
    <div style={{ padding: '1000px 0' }}>
      <h2 style={{ position: 'fixed', left: 0, top: 0 }}>CustomScrollPositionHook: {position}</h2>
    </div>
  )
}
