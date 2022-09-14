import React, { PureComponent, createRef } from 'react'

/**
 * 使用ref获取元素：
 * 1.react已弃用
 *  (1) 直接 ref='xxx' 
 * 2.传入对象(推荐)
 *  (1) 现在constructor中使用createRef()创建一个ref对象并绑定到this上，如'this.titleRef = createRef();'
 *  (2) 在元素上使用 'ref={this.titleRef}' 进行绑定
 * 3.传入函数
 *  (1) 现在constructor中使用声明一个变量并绑定到this上，如'this.titleEl = null;'
 *  (2) 在元素上使用 'ref={arg => this.titleEl = arg}' 进行绑定
 */

class Counter extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
}

export default class App extends PureComponent {

  constructor(props) {
    super(props);

    this.titleRef = createRef()
    this.counterRef = createRef()
    this.titleEl = null
  }

  render() {
    return (
      <div>
        {/* 方式一：<h2 ref=字符串/对象/函数>Hello React</h2> */}
        <h2 ref='titleRef'>Hello React</h2>
        {/* 方式二：目前React推荐的方式 */}
        <h2 ref={this.titleRef}>Hello React</h2>
        {/* 方式三 */}
        <h2 ref={arg => this.titleEl = arg}>Hello React</h2>
        <button onClick={e => this.changeText()}>改变文本</button>
        <hr />
        <Counter ref={this.counterRef} />
        <button onClick={e => this.appBtnClick()}>App按钮</button>
      </div>
    )
  }

  changeText() {
    // 1.使用方式一: 字符串(不推荐, 后续的更新会删除)
    this.refs.titleRef.innerHTML = 'Hello LHT'
    // 2.使用方式二: 对象方式
    this.titleRef.current.innerHTML = 'Hello JavaScript'
    // 3.使用方式三: 回调函数方式
    this.titleEl.innerHTML = 'Hello TypeScript'
  }

  appBtnClick() {
    console.log(this.counterRef)
    this.counterRef.current.increment()
  }
}
