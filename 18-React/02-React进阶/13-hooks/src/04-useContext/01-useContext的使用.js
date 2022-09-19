import React, { useContext } from 'react'

import { UserContext, ThemeContext } from '../App'

export default function ContextHookDemo(props) {
  const user = useContext(UserContext)
  const theme = useContext(ThemeContext)

  console.log(user, theme)

  return (
    <div>
      <h2>ContextHookDemo</h2>
    </div>
  )
}
