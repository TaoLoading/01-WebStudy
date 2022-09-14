import React, { PureComponent } from 'react'

class App extends PureComponent {
  render() {
    return (
      <div>
        App: {this.props.name}
      </div>
    )
  }
}

// 类式
function enhanceComponent(WrappedComponent) {
  class NewComponent extends PureComponent {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
  // 组件重命名
  NewComponent.displayName = 'newName'
  return NewComponent
}

// 函数式
function enhanceComponent2(WrappedComponent) {
  function NewComponent(props) {
    return <WrappedComponent {...props} />
  }
  // 组件重命名
  NewComponent.displayName = 'newName'
  return NewComponent
}

const EnhanceComponent = enhanceComponent2(App)

export default EnhanceComponent
