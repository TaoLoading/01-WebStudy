import React, { PureComponent } from 'react'
import { incAction, addAction } from '../store/actionCreators'
// import { connect } from '../util/connect'
import { connect } from 'react-redux'

class addition extends PureComponent {
  render() {
    return (
      <div>
        <div>Home</div>
        <h2>当前计数：{this.props.counter}</h2>
        <button onClick={e => this.props.increment()}>+1</button>
        <button onClick={e => this.props.addNumber(5)}>+5</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increment: function () {
      dispatch(incAction())
    },
    addNumber: function (num) {
      dispatch(addAction(num))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(addition)