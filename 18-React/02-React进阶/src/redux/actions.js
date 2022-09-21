import { INCREMENT, DECREMENT } from './constant'

export const incrementAction = (data) => {
  return { type: INCREMENT, data }
}

export const decrementAction = (data) => {
  return { type: DECREMENT, data }
}
