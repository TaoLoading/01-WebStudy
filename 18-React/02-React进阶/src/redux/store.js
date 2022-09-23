import { legacy_createStore, applyMiddleware } from 'redux'
// 用于支持异步action
import thunk from 'redux-thunk'
import countReducer from './reducer'

export default legacy_createStore(countReducer, applyMiddleware(thunk))