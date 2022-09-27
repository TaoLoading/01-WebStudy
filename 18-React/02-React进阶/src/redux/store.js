import { legacy_createStore, applyMiddleware, combineReducers } from 'redux'
// 用于支持异步action
import thunk from 'redux-thunk'
import countReducer from './reducers/count'
import personReducer from './reducers/person'

/**
 * 合并Reducer
 * 使用combineReducers合并Reducer，key为自定义，value为reducer
 */
const allReducer = combineReducers({
  count: countReducer,
  persons: personReducer
})

export default legacy_createStore(allReducer, applyMiddleware(thunk))