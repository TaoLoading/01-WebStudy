import React, { Component } from 'react'

export default class homeMessage extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <a href="/home/message/1">message001</a>&nbsp;&nbsp;
            <button>push查看</button>&nbsp;&nbsp;
            <button>replace查看</button>
          </li>
          <li>
            <a href="/home/message/3">message003</a>&nbsp;&nbsp;
            <button>push查看</button>&nbsp;&nbsp;
            <button>replace查看</button>
          </li>
          <li>
            <a href="/home/message/5">message005</a>&nbsp;&nbsp;
            <button>push查看</button>&nbsp;&nbsp;
            <button>replace查看</button>
          </li>
        </ul>
        <button>回退</button>
      </div>
    )
  }
}