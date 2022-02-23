import React from 'react'
import { decAction, subAction } from '../store/actionCreators'
import { connect } from 'react-redux'

function subtraction(props) {
  return (
    <div>
      <hr />
      <div>About</div>
      <h2>当前计数：{props.counter}</h2>
      <button onClick={e => props.decrement()}>-1</button>
      <button onClick={e => props.subNumber(5)}>-5</button>
      <h1>Banner</h1>
      {/* <ul>
        {
          props.banners.map((item, index) => {
            return <li key={item.acm}>{item.title}</li>
          })
        }
      </ul>
      <h1>Recommend</h1>
      <ul>
        {
          props.recommends.map((item, index) => {
            return <li key={item.acm}>{item.title}</li>
          })
        }
      </ul> */}
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
