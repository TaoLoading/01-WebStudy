/**
 * 该文件用于创建action对象
 */

import { INCREMENT, DECREMENT } from './constant'

// 加
export const incrementAction = (data) => {
  return { type: INCREMENT, data }
}
// 异步加
/**
 * 异步action中，返回值为函数，其中一般会调用同步action
 */
export const incrementAsyncAction = (data, delay) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(incrementAction(data))
    }, delay)
  }
}
// 减
export const decrementAction = (data) => {
  return { type: DECREMENT, data }
}
