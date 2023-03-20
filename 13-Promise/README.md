# 注意，本模块（Promise）正在进行修改，当前并非最终版

# Promise 从入门到深入
## 1. 准备
### 1.1. 函数对象与实例对象
    1. 函数对象：将函数作为对象使用时，简称为函数对象
    2. 实例对象：new 函数产生的对象，简称为对象

### 1.2. 回调函数的分类
    1. 同步回调：
        理解：立即执行，完全执行完了才结束，不会放入回调队列中
        例子：数组遍历相关的回调函数 / Promise 的 executor 函数
    2. 异步回调：
        理解：不会立即执行，会放入回调队列中将来执行
        例子：定时器回调 / ajax 回调 / Promise 的成功 | 失败的回调

### 1.3. JS 中的 Error
    1. 错误的类型
        Error: 所有错误的父类型
        ReferenceError: 引用的变量不存在
        TypeError: 数据类型不正确的错误
        RangeError: 数据值不在其所允许的范围内
        SyntaxError: 语法错误
    2. 错误处理
        捕获错误：try ... catch
        抛出错误：throw error
    3. 错误对象
        message 属性：错误相关信息
        stack 属性：函数调用栈记录信息

## 2. Promise 的理解和使用
### 2.1. Promise 是什么？
    1.抽象表达：
        Promise 是一门新的技术 (ES6 规范)
        Promise 是 JS 中进行异步编程的新解决方案 (旧的是谁？)
    2.具体表达：
        从语法上来说：Promise 是一个构造函数
        从功能上来说：promise 对象用来封装一个异步操作并可以获取其成功/失败的结果值
    3. promise 的状态改变 (只有 2 种，只能改变一次)
        pending 变为 resolved
        pending 变为 rejected
    4. promise 的基本流程
![promise 基本流程](http://vipkshttp1.wiz.cn/ks/share/resources/49c30824-dcdf-4bd0-af2a-708f490b44a1/92b8cbfb-a474-4859-943b-6048e9dc66f6/index_files/9b2b980e2959c4f996cafddb03fa5d4d.png)

### 2.2. 为什么要用 Promise?
    1. 指定回调函数的方式更加灵活：可以在请求发出甚至结束后指定回调函数
    2. 支持链式调用， 可以解决回调地狱问题

### 2.3. 如何使用 Promise?
    1. 主要 API
        Promise 构造函数：Promise (executor) {}
        Promise.prototype.then 方法：(onResolved, onRejected) => {}
        Promise.prototype.catch 方法：(onRejected) => {}
        Promise.resolve 方法：(value) => {}
        Promise.reject 方法：(reason) => {}
        Promise.all 方法：(promises) => {}
        Promise.race 方法：(promises) => {}
    2. 几个重要问题
        如何改变 promise 的状态？
        一个promise指定多个成功/失败回调函数, 都会调用吗？
        promise.then() 返回的新 promise 的结果状态由什么决定？
        改变 promise 状态和指定回调函数谁先谁后？
        promise 如何串连多个操作任务？
        promise 错误穿透？
        中断 promise 链

## 3. 自定义 Promise
    1. 定义整体结构
    2. Promise 构造函数的实现
    3. promise.then()/catch() 的实现
    4. Promise.resolve()/reject() 的实现
    5. Promise.all/race() 的实现
    6. Promise.resolveDelay()/rejectDelay() 的实现
    7. ES6 class 版本

## 4. async 与 await
    1. async 函数
        函数的返回值为 promise 对象
        promise 对象的结果由 async 函数执行的返回值决定
   
    2. await 表达式
        await 右侧的表达式一般为 promise 对象，但也可以是其它的值
        如果表达式是 promise 对象，await 返回的是 promise 成功的值
        如果表达式是其它值，直接将此值作为 await 的返回值
    
    3. 注意:
        await 必须写在 async 函数中，但 async 函数中可以没有 await
        如果 await 的 promise 失败了，就会抛出异常，需要通过 try...catch 来捕获处理

## 5. JS 异步之宏队列与微队列
![宏队列与微队列](http://vipkshttp1.wiz.cn/ks/share/resources/49c30824-dcdf-4bd0-af2a-708f490b44a1/92b8cbfb-a474-4859-943b-6048e9dc66f6/index_files/60b9ff398449db2dcfef9197e2187ae6.png)

	1. 宏列队: 用来保存待执行的宏任务(回调), 比如: 定时器回调/DOM事件回调/ajax回调
	2. 微列队: 用来保存待执行的微任务(回调), 比如: promise的回调/MutationObserver的回调
	3. JS执行时会区别这2个队列
		JS引擎首先必须先执行所有的初始化同步任务代码
		每次准备取出第一个宏任务执行前, 都要将所有的微任务一个一个取出来执行

