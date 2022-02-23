# Redux

## 1. 纯函数的定义
* 此函数在相同的输入值时，需产生相同的输出。函数的输出和输入值以外的其他隐藏信息或状态无关，也和由I/O设备产生的
外部输出无关。（确定的输入，一定会产生确定的输出）
* 该函数不能有语义上可观察的函数副作用，诸如“触发事件”，使输出设备输出，或更改输出值以外物件的内容等。（函数在执行过程中，不能产生副作用）
* 满足以上条件的任意一个，则被称为纯函数。

## 2. Redux的构成
* store --- 管理数据
* action --- 更新数据
* reducer --- 联系state和action

## 3. Redux的三大原则
* 单一数据源
  * 整个应用程序的state被存储在一颗object tree中，并且这个object tree只存储在一个store中；
  * Redux并没有强制让我们不能创建多个store，但是那样做并不利于数据的维护；
  * 单一的数据源可以让整个应用程序的state变得方便维护、追踪、修改。
* state是只读的
  * 唯一修改state的方法一定是触发action，不要试图在其他地方通过任何的方式来修改state；
  * 这样就确保了View或网络请求都不能直接修改state，它们只能通过action来描述自己想要如何修改state；
  * 这样可以保证所有的修改都被集中化处理，并且按照严格的顺序来执行，所以不需要担心race condition（竟态）的问题。
* 使用纯函数来执行修改
  * 通过reducer将旧state和actions联系在一起，并且返回一个新的state；
  * 随着应用程序的复杂度增加，我们可以将reducer拆分成多个小的reducers，分别操作不同state tree的一部分。

## 4. Redux的基本使用
1. 初始化state值
  ```
   const initialState = {
     counter: 0
   }
  ```
2. 创建reducer(store与action沟通的桥梁)
  ```
   function reducer(state = initialState, action) {
     switch (action.type) {
       case 'INCREMENT':
         // 不能直接修改state
         return { ...state, counter: state.counter + 1 }
       case 'DECREMENT':
         return { ...state, counter: state.counter - 1 }
       case 'ADD':
         return { ...state, counter: state.counter + action.num }
       case 'SUB':
         return { ...state, counter: state.counter - action.num }
       default:
         return state
     }
   }
  ```
3. 创建store(创建时传入一个reducer)
  ``` const store = redux.createStore(reducer) ```
4. 创建action
  ``` const action1 = { type: 'INCREMENT' } ```
5. 分发action
  ``` store.dispatch(action1) ```
6. 订阅state的修改(具体代码放到派发action前)
  ```
   store.subscribe(() => {
     console.log('counter:', store.getState().counter)
   })
  ```

## 5. 工程化下Redux的基本使用（见01-Redux的基本使用文件夹）

## 6. Redux案例 —— 加减法（见结合React使用文件夹的01和02代码）
### 6.1 基础版
### 6.2 抽离代码版
* 通过connect.js文件抽离部分公共代码，用作组件和Redux的连接
  1. 定义connect函数，接收从组件中传来的mapStateToProps、mapDispatchProps两个参数
  2. 返回一个高阶函数，接收一个组件参数，返回一个组件
* 改良组件代码，减少对store的依赖
  1. 将state的定义、订阅与卸载订阅抽离到connect.js文件中
  2. 将组件改为函数式组件
  3. 修改state的定义，不从store中读取，减少对store的依赖
    ```
      const mapStateToProps = state => {
       return {
         counter: state.counter
       }
      }
    ```
  4. 修改dispatch的分发，不从store中读取，减少对store的依赖
    ```
     decrement: function () {
       dispatch(decAction())
     }
    ```
  5. 调用connect并暴露
    ``` export default connect(mapStateToProps, mapDispatchProps)(subtraction) ```

## 7. 封装context（见结合React使用文件夹的03代码）
* 封装目的：通过context.js帮助connect.js完全脱离项目文件的引入，使其独立

## 8. react-redux库版（见结合React使用文件夹的04代码）

## 9. 组件中的异步操作，以发送网络请求为例（见结合React使用文件夹的05代码）
1. 在componentDidMount()中发送网络请求
2. 拿到数据后通过dispatch派发事件
3. 使用reducer将处理后的state导出，此时完成网络请求的数据放到state中

## 10. redux中的异步操作（见结合React使用文件夹的06代码）
### 10.1 操作原因：
* 在组件中进行异步操作则必须将网络请求的异步代码放到组件的生命周期中来完成
* 事实上，网络请求到的数据也属于我们状态管理的一部分，更好的一种方式应该是将其也交给redux来管理
### 10.2 实现途径
* 中间件，如redux-thunk
### 10.3 redux-thunk基础介绍
* 默认情况下的dispatch(action)，action需要传入是一个对象
* redux-thunk可以让dispatch(action函数)，action可以是一个函数
* 该函数会被调用，并且会传给这个函数一个dispatch函数和getState函数
  1. dispatch函数用于我们之后再次派发action
  2. getState函数考虑到我们之后的一些操作需要依赖原来的状态，用于让我们可以获取之前的一些状态
### 10.4 redux-thunk具体使用
1. 在store中引入redux-thunk并进行应用，拿到返回值
  ```
    const storeEnhancer = applyMiddleware(thunkMiddleware)
  ```
2. 在createStore中传入拿到的storeEnhancer
  ```
    const store = createStore(reducer, storeEnhancer)
  ```
3. 创建相关action，在其中书写发送网络请求的函数，由于redux-thunk的作用，该函数会被自动调用
  ```
    export const getHomeMultidataAction = (dispatch, getState) => {
      axios({
        url: "xxx",
      }).then(res => {
        const data = res.data.data;
        dispatch(changeBannersAction(data.banner.list));
        dispatch(changeRecommendAction(data.recommend.list));
      })
    }
  ```
4. 在组件中引入相关action，此时不在componentDidMount中发送网络请求，而是调用映射的函数
  ```
    componentDidMount() {
      this.props.getHomeMultidata()
    }

    const mapDispatchToProps = dispatch => {
      return {
        increment: function () {
          dispatch(incAction())
        },
        addNumber: function (num) {
          dispatch(addAction(num))
        },
        getHomeMultidata() {
          // 传入一个函数
          dispatch(getHomeMultidataAction)
        }
      }
    }
  ```