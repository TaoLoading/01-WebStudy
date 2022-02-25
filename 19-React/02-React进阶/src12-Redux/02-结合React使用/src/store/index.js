import { createStore, applyMiddleware, compose } from 'redux' // applyMiddleware用于应用中间件
import thunkMiddleware from 'redux-thunk' // 导入的是中间件对象
import createSagaMiddleware from 'redux-saga' // 导入的是创建中间件函数
import saga from './saga'
import reducer from './reducer.js'

// 案例1，应用中间件并创建store
/* const storeEnhancer = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, storeEnhancer) */

// 案例2，整合composeEnhancers函数，方便调试工具的使用
/* const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose
const storeEnhancer = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, composeEnhancers(storeEnhancer)) */

// 案例3，使用redux-saga中间件
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose
// 1. 使用redux-saga创建中间件
const sagaMiddleware = createSagaMiddleware()
// 2. 应用中间件
const storeEnhancer = applyMiddleware(thunkMiddleware, sagaMiddleware)
// 3. 创建store
const store = createStore(reducer, composeEnhancers(storeEnhancer))
// 4.运行创建的sagaMiddleware中间件
sagaMiddleware.run(saga)

export default store
