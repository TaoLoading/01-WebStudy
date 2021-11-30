import React, { Component } from 'react'
import Item from '../item/item'

export default class List extends Component {
  render() {
    return (
      <div className="row">
        {/* item组件 */}
        <Item />
      </div>
    )
  }
}