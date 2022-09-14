import React, { PureComponent } from 'react'

/**
 * 需求分析：
 * 向Home和About两个子组件中插入“区域：中国”的文字，
 * 并且为防止多次调用传值的复杂，不使用在App组件中传值props的方式
 * 
 * 实现方式：
 * 在高阶组件中增强props，进行传值
 */

// 1.定义高阶组件
function enhanceRegionProps(WrappedComponent) {
  return props => {
    return <WrappedComponent {...props} region='中国' />
  }
}

class Home extends PureComponent {
  render() {
    return <h2>Home: {`昵称: ${this.props.nickname} 等级: ${this.props.level} 区域: ${this.props.region}`}</h2>
  }
}
class About extends PureComponent {
  render() {
    return <h2>About: {`昵称: ${this.props.nickname} 等级: ${this.props.level} 区域: ${this.props.region}`}</h2>
  }
}

// 2.使用高阶组件处理子组件
const EnhanceHome = enhanceRegionProps(Home)
const EnhanceAbout = enhanceRegionProps(About)

class App extends PureComponent {
  render() {
    return (
      <div>
        App
        <EnhanceHome nickname="LHT" level={90} />
        <EnhanceAbout nickname="HT" level={99} />
      </div>
    )
  }
}

export default App

