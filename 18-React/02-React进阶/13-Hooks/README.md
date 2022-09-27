# Hooks

## 1. Hooks介绍
### 1.1 Hooks是什么
* Hook是React16.8的新增特性，它可以让我们在不编写class的情况下使用state以及其他的React特性(比如生命周期)
* Hook指的类似于useState、useEffect这样的函数，Hooks是对这类函数的统称
### 1.2 class组件相对于函数式组件有什么优势
* class组件可以定义自己的state，用来保存组件自己内部的状态
* class组件有自己的生命周期，我们可以在对应的生命周期中完成自己的逻辑
* class组件可以在状态改变时只会重新执行render函数以及我们希望重新调用的生命周期函数componentDidUpdate等
### 1.3 class组件存在的问题
* 随着业务的增多，class组件变得非常复杂
* 学习难度较大
* 组件复用状态难度大
### 1.4 Hooks使用场景
* Hook的出现基本可以代替我们之前所有使用class组件的地方(除了一些非常不常用的场景)
* 但是如果是一个旧的项目，你并不需要直接将所有的代码重构为Hooks，因为它完全向下兼容，你可以渐进式的来使用它
* Hook只能在函数组件中使用，不能在类组件，或者函数组件之外的地方使用

## 2. useState
### 2.1 介绍
* useState会定义一个与class里this.state功能完全相同的state变量，从而实现在函数式组件中应用state
### 2.2 参数
* 初始化值，如果不设置为undefined
### 2.3 返回值：数组，共有两个元素
* 元素1: 当前state的值
* 元素2: 新函数，用于设置新的值
### 2.4 使用规则
1. 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用
2. 只能在React的函数组件中调用Hook。不要在其他JavaScript函数中调用
### 2.5 注意事项
* 修改值时不可直接采用点击事件的方式修改，应展开原State再传入新元素
  ```javascript
  <button onClick={e => setFriends([...friends, "tom"])}>添加朋友</button>
  ```
    
## 3. useEffect
### 3.1 介绍
* useEffect会在函数式组件中实现类似class生命周期的功能，通过useEffect的Hook可以告诉React需要在渲染后执行某些操作
### 3.2 参数
* 参数一：传入一个回调函数，在React执行完更新DOM操作之后，就会回调这个函数
* 参数二：传入一个数组，数组内传入useEffect执行所依赖的元素，即当该元素发生变化或页面刷新时才执行该useEffect。传入空数组则该useEffect只在页面刷新时执行。涉及到useEffect的性能优化
### 3.3 执行规则
1. 在React执行完更新DOM操作之后，就会回调这个函数
2. 默认情况下，无论是第一次渲染之后还是每次更新之后，都会执行这个回调函数
3. return一个回调函数，在取消事件订阅时自动调用
4. 定义多个useEffect时按其定义的先后顺序执行

## 4. useContext
### 4.1 介绍
* 简化共享文件时Context的使用，直接获取Context的值
   ```javascript
   const user = useContext(UserContext)
   ```

## 5. useReducer
### 5.1 介绍
* useReducer并非是Redux的替代品，而是类似useState的替代方案
* 在某些场景下，如果state的处理逻辑比较复杂，我们可以通过useReducer来对其进行拆分
* 数据是不会共享的，它们只是使用了相同的counterReducer的函数而已
### 5.2 参数
* 参数一：reducer函数
* 参数二：初始值，类型不限
### 5.3 使用规则
1. 创建reducer纯函数
2. 在组件内引入useReducer并传入reducer和初始值从而创建state
   ```javascript
   const [state, dispatch] = useReducer(reducer, { counter: 0 })
   ```
3. 分发对应事件
   ```javascript
   <button onClick={e => dispatch({ type: "increment" })}>+1</button>
   <button onClick={e => dispatch({ type: "decrement" })}>-1</button>
   ```

## 6. useCallback
### 6.1 介绍
* useCallback实际目的是为了进行性能的优化
* 将回调函数传入useCallback中，当所依赖值发生变化时才渲染该函数
### 6.2 传参(参数形式类似useEffect)
* 参数一：回调函数
* 参数二：所依赖的值
### 6.3 应用场景
* 在将一个组件中的函数, 传递给子组件进行回调使用时, 使用useCallback对函数进行处理
### 6.4 注意点
* 子组件为函数式组件时需要用memo()进行包裹，见06-02文件
* 子组件为类组件时需要继承PureComponent

## 7. useMemo
### 7.1 介绍
* useMemo实际目的也是为了进行性能的优化
### 7.2 传参(参数形式类似useEffect)
* 参数一：回调函数
* 参数二：所依赖的值

## 8. useRef
### 8.1 介绍
* useRef返回一个Ref对象，返回的Ref对象再组件的整个生命周期保持不变
* 即当组件重新渲染时，无论传入的值是否变化，useRef返回的值总是最初值
### 8.2 使用规则
1. 用法一：
   1. 通过useRef()创建一个Ref
      ```javascript
      const titleRef = useRef()
      ```
   2. 在组件中绑定到对应的ref
      ```javascript
      <h2 ref={titleRef}>RefHookDemo01</h2>
      ```
   3. 获取相对的元素
      ```javascript
      titleRef.current.innerHTML = "Hello World"
      ```
2. 用法二：
   1. 在组件内直接使用useRef()创建一个Ref
      ```javascript
      const numRef = useRef(0)
      ```
   2. 读取Ref中的值
      ```javascript
      <h2>count上一次的值: {numRef.current}</h2>
      ```
   3. 在组件整个生命周期内返回的Ref对象总是不变的
### 8.3 使用场景
* 引用DOM
* 使用ref保存上一次的某一个值
### 8.4 注意点
* 不能直接对函数式组件使用useRef()，需要在其外侧包裹forwardRef()，将函数式组件作为参数传递给，需要在其外侧包裹forwardRef()，并在函数内再进行一次ref的传值。见09-01文件

## 9. useImperativeHandle
### 9.1 介绍
* 在使用ref时是将整个组件进行暴露，这就导致其他组件拿到该组件后可以进行任意修改
* useImperativeHandle()可以对暴露的进行限制
### 9.2 使用规则
* 在函数式组件内对返回的值使用useImperativeHandle()进行修改。见09-02文件
* 其中：
1. 父组件中将inputRef传递给子组件
2. 子组件经过useImperativeHandle()将useImperativeHandle()返回的对象绑定到ref返回的current中
3. 最后父组件使用的inputRef是经过处理后的只有focus的元素

## 10. useLayoutEffect
### 10.1 与useEffect的区别
* useEffect会在渲染的内容更新到DOM上后执行，不会阻塞DOM的更新
* useLayoutEffect会在渲染的内容更新到DOM上之前执行，会阻塞DOM的更新
### 10.2 10-02文件执行顺序
* useEffect
   1. 点击修改数字，将10修改为0
   2. 渲染完毕界面，执行useEffect()
   3. 符合if语句条件，又将0修改为随机数，重新
* useLayoutEffect
   1. 点击修改数字，将10修改为0
   2. 此时页面为进行渲染，页面还是10，而state中是0
   3. 在渲染完毕页面之前执行useLayoutEffect()
   4. 符合if语句条件，又将0修改为随机数，渲染页面
