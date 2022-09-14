import store from './store/index.js'
import { addAction, subAction, incAction, decAction } from './store/actionCreators.js'

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(addAction(10))
store.dispatch(addAction(15))
store.dispatch(subAction(8))
store.dispatch(subAction(5))
store.dispatch(incAction())
store.dispatch(decAction())

