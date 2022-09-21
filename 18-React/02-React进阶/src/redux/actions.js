/**
 * 该文件用于创建action对象
 */

import { INCREMENT, DECREMENT } from './constant'

export const incrementAction = (data) => {
  return { type: INCREMENT, data }
}

export const decrementAction = (data) => {
  return { type: DECREMENT, data }
}
