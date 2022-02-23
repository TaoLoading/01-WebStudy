import { createStore, applyMiddleware } from 'redux' // applyMiddleware用于应用中间件
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer.js'

// 应用中间件
const storeEnhancer = applyMiddleware(thunkMiddleware)

const store = createStore(reducer, storeEnhancer)

export default store;
