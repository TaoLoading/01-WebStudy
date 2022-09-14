import React, { PureComponent } from 'react'

class LoginPage extends PureComponent {
  render() {
    return <h2>LoginPage</h2>
  }
}

// 负责鉴权操作的高阶组件
function withAuth(WrappedComponent) {
  const NewCpn = props => {
    const { isLogin } = props;
    if (isLogin) {
      return <WrappedComponent {...props} />
    } else {
      return <LoginPage />
    }
  }

  NewCpn.displayName = 'AuthCpn'
  return NewCpn;
}

class CartPage extends PureComponent {
  render() {
    return <h2>CartPage</h2>
  }
}

// 将需要鉴权的组件使用高阶组件进行处理
const AuthCartPage = withAuth(CartPage)

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <AuthCartPage isLogin={true} />
      </div>
    )
  }
}
