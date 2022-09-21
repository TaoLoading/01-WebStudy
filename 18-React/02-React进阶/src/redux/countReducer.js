/**
 * 该文件用于创建一个为Count组件服务的reducer，reducer本质是一个函数
 * 
 * reducer函数接收两个参数：之前的状态(preState)、动作对象(action)
 *                        第一次被调用时，preState为undefined
 */

export default function countReducer(preState, action) {
  if (preState === undefined) {
    preState = 0
  }

  const { type, data } = action

  switch (type) {
    case 'increment':
      return preState + data * 1
    case 'decrement':
      return preState - data * 1
    case 'incrementOfOdd':
      return preState + data * 1
    case 'incrementOfAsync':
      return preState + data * 1
    default:
      return preState
  }
}
