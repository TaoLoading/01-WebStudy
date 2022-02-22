import { PureComponent } from "react"
import store from '../store/index'

// 用于将组件和redux相连接，并抽离部分公共代码
export function connect(mapStateToProps, mapDispatchProps) {
  return function enhanceHOC(WrappedComponent) {
    return class extends PureComponent {
      constructor(props) {
        super(props)

        // 定义state
        this.state = {
          storeState: mapStateToProps(store.getState())
        }
      }

      // 订阅store中数据的变化
      componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
          this.setState({
            storeState: mapStateToProps(store.getState())
          })
        })
      }

      // 取消订阅
      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        return <WrappedComponent {...this.props} {...mapStateToProps(store.getState())} {...mapDispatchProps(store.dispatch)} />
      }
    }
  }
}