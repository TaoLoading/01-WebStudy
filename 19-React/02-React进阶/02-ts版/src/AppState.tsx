/**
 * 全局State和上下文关系组件contextComponent
 */

import React from 'react'

const defaultContextValue = {
  username: 'LHT'
}
export const appContext = React.createContext(defaultContextValue)
