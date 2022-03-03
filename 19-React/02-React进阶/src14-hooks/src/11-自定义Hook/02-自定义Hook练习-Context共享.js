import React, { useContext } from 'react'
import useUserContext from '../hooks/user-hook'

export default function CustomContextShareHook() {
  const [user, token] = useUserContext()
  console.log(user, token)

  return (
    <div>
      <h2>CustomContextShareHook</h2>
    </div>
  )
}


