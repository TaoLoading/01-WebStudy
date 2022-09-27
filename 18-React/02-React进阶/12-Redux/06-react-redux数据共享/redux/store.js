import { legacy_createStore, applyMiddleware } from 'redux'
// 用于支持异步action
import thunk from 'redux-thunk'
// 合并后的reducer
import allReducer from './reducers/index'

export default legacy_createStore(allReducer, applyMiddleware(thunk))