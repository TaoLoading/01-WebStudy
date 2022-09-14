import { PureComponent } from "react"
import store from '../store/index'
import StoreContext from './context'

// 用于将组件和redux相连接，并抽离部分公共代码
export function connect(mapStateToProps, mapDispatchProps) {
  return function enhanceHOC(WrappedComponent) {
    class EnhanceComponent extends PureComponent {
      constructor(props) {
        super(props)

        // 定义state
        this.state = {
          storeState: mapStateToProps(store.getState())
        }
      }

      // 订阅store中数据的变化
      componentDidMount() {
        this.unsubscribe = this.context.subscribe(() => {
          this.setState({
            storeState: mapStateToProps(this.context.getState())
          })
        })
      }

      // 取消订阅
      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        return <WrappedComponent {...this.props} {...mapStateToProps(this.context.getState())} {...mapDispatchProps(this.context.dispatch)} />
      }
    }
    EnhanceComponent.contextType = StoreContext
    return EnhanceComponent
  }
}