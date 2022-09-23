import { legacy_createStore } from 'redux'
import countReducer from './reducer'

export default legacy_createStore(countReducer)