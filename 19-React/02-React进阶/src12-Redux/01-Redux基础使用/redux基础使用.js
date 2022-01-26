const redux = require('redux')

const initialState = {
  counter: 0
}

// reducer(store与action沟通的桥梁)
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      // 不能直接修改state
      return { ...state, counter: state.counter + 1 }
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 }
    case 'ADD':
      return { ...state, counter: state.counter + action.num }
    case 'SUB':
      return { ...state, counter: state.counter - action.num }
    default:
      return state
  }
}

// 创建store(创建时传入一个reducer)
const store = redux.createStore(reducer)

// 订阅state的修改
store.subscribe(() => {
  console.log('counter:', store.getState().counter)
})

// 创建action
const action1 = { type: 'INCREMENT' }
const action2 = { type: 'DECREMENT' }
const action3 = { type: 'ADD', num: 2 }
const action4 = { type: 'SUB', num: 2 }

// 分发action
store.dispatch(action1)
store.dispatch(action2)
store.dispatch(action3)
store.dispatch(action4)
