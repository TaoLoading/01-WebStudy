import React, { Component } from 'react'

/**
 * setState在以下方式中是同步的：
 * 1.setTimeout
 * 2.原生dome事件。如addEventListener
 */

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'Hello World'
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <button onClick={e => this.changeText()}>改变文本</button>
        <button id="btn">改变文本2</button>
      </div>
    )
  }

  componentDidMount() {
    document.getElementById('btn').addEventListener('click', (e) => {
      this.setState({
        message: '你好啊,李银河'
      })
      console.log(this.state.message)
    })

    // this.setState({
    //   message: '你好啊,李银河'
    // })
    // console.log(this.state.message)
  }

  changeText() {
    // 情况一: 将setState放入到定时器中
    setTimeout(() => {
      this.setState({
        message: '你好啊,李银河'
      })
      console.log(this.state.message)
    }, 0)
  }
}
