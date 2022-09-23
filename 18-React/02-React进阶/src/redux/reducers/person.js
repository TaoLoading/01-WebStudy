import { ADD_PERSON } from '../constant'

export default function personReducer(preState, action) {
  if (preState === undefined) {
    preState = [{
      id: '001',
      name: 'Tom',
      age: 23
    }]
  }

  const { type, data } = action

  switch (type) {
    case ADD_PERSON:
      return [data, ...preState]
    default:
      return preState
  }
}
