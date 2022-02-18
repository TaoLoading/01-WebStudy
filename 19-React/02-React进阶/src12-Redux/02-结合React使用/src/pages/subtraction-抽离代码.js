import React, { PureComponent } from 'react'
import store from '../store/index'
import { decAction, subAction } from '../store/actionCreators'
import { connect } from '../util/connect'

function subtraction(props) {
  return (
    <div>
      <hr />
      <div>About</div>
      <h2>当前计数：{props.counter}</h2>
      <button onClick={e => props.decrement()}>-1</button>
      <button onClick={e => props.subNumber(5)}>-5</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}
const mapDispatchProps = dispatch => {
  return {
    decrement: function () {
      dispatch(decAction())
    },
    subNumber: function (num) {
      dispatch(subAction(num))
    }
  }
}

export default connect(mapStateToProps, mapDispatchProps)(subtraction)
