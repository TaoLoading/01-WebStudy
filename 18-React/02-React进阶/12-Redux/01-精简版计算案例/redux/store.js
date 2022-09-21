import { legacy_createStore } from 'redux'
import countReducer from './countReducer'

export default legacy_createStore(countReducer)