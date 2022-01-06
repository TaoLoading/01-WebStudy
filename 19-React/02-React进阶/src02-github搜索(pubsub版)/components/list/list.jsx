import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import Item from '../item/item'

export default class List extends Component {
  state = {
    user: [],
    isFirst: true,
    isLoading: false,
    error: ''
  }

  componentDidMount() {
    // 完成消息订阅
    PubSub.subscribe('updateState', (msg, data) => {
      this.setState(data)
    })
  }

  render() {
    let { user, isFirst, isLoading, error } = this.state
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