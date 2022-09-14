import React, { Component } from 'react'
import Item from '../item/item'

export default class List extends Component {
  render() {
    let { user, isFirst, isLoading, error } = this.props
    if (isFirst) {
      return <h2>请输入关键词以搜索用户</h2>
    } else if (isLoading) {
      return <h2>Loading...</h2>
    } else if (error) {
      return <h2>{error}</h2>
    } else {
      return (
        <div className="row">
          {
            user.map((item) => {
              return <Item key={item.login} {...item} />
            })
          }
        </div>
      )
    }
  }
}