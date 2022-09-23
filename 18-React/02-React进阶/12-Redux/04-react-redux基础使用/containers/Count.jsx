/**
 * 此文件为Count组件的容器组件(具体见react-redux模型图)
 */

// 用于连接UI组件与redux
import { connect } from 'react-redux'
import CountUI from '../components/Count'
import { incrementAction, incrementAsyncAction, decrementAction } from '../redux/actions'

/**
 * mapStateToProps()
 * 1. 用于传递状态
 * 2. 返回一个对象
 * 3. react-redux在调用该函数时已经传入了state
 * 4. 此处的值传入UI组件中，UI组件可使用this.props.xxx拿到对应的值
 */
const mapStateToProps = (state) => {
  return {
    count: state
  }
}

/**
 * mapDispatchToProps()
 * 1. 用于传递操作状态的方法
 * 2. 返回一个对象，对象的value是一个方法
 */
const mapDispatchToProps = (dispatch) => {
  return {
    add: (num) => {
      dispatch(incrementAction(num))
    },
    addAsync: (num, delay) => {
      dispatch(incrementAsyncAction(num, delay))
    },
    reduce: (num) => {
      dispatch(decrementAction(num))
    }
  }
}
// 可简写为：
/* const mapDispatchToProps = {
  add: incrementAction,
  addAsync: incrementAsyncAction,
  reduce: decrementAction
} */

// 定义容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI)
