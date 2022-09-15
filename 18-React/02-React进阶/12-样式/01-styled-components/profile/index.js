import React, { PureComponent } from 'react'
import styled from 'styled-components'

/**
 * 特点:
 *  1.props穿透
 *  2.attrs的使用
 *  3.传入state作为props属性
 */

// 可以在attrs()中定义属性，传入一个对象，其返回值也是一个函数
const HYInput = styled.input.attrs({
  placeholder: "请输入",
  bColor: "red"
})`
  background-color: lightblue;
  /* 拿到attrs()中定义的bColor */
  border-color: ${props => props.bColor};
  /* 拿到state中定义的color，前提是现在组件引用时进行传值 */
  color: ${props => props.color};
`

export default class Profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      color: 'purple'
    }
  }

  render() {
    return (
      <div>
        <input type="password" />
        <HYInput type="password" color={this.state.color} />
        <h2>我是Profile的标题</h2>
        <ul>
          <li>设置列表1</li>
          <li>设置列表2</li>
          <li>设置列表3</li>
        </ul>
      </div>
    )
  }
}
