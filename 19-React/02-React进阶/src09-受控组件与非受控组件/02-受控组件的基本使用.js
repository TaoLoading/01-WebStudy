import React, { PureComponent } from 'react'

/**
 * 受控组件：如果输入项在输入时会自动将内容维护到state中，则该组件叫做受控组件
 * 非受控组件：即不会维护到state中
 */

export default class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      username: ""
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="username">
            用户:
            {/* 受控组件 */}
            <input type="text"
              id="username"
              onChange={e => this.handleChange(e)}
              value={this.state.username} />
          </label>
          <input type="submit" value="提交" />
        </form>
      </div>
    )
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.username)
  }

  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }
}
