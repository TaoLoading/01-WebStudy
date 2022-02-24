import { createStore, applyMiddleware, compose } from 'redux' // applyMiddleware用于应用中间件
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer.js'

// 应用中间件
/* const storeEnhancer = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, storeEnhancer) */

// 整合composeEnhancers函数，方便调试工具的使用
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;
const storeEnhancer = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, composeEnhancers(storeEnhancer))


export default store;
