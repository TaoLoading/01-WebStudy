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

## 5. 工程化下Redux的基本使用
### 见01-Redux的基本使用文件夹

## 6. Redux案例 ———— 加减法
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
### 6.3 封装context版
* 封装目的：通过context.js帮助connect.js完全脱离项目文件的引入，使其独立
### 6.4 使用react-redux库版