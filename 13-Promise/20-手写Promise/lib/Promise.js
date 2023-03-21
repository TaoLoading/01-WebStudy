/* 
自定义 Promise 模块
步骤：
1.定义构造器及 API
2.定义状态
3.在 resolve() 和 reject() 中改变状态和值
4.调用.then() 时将两个回调函数以对象的形式保存到 promise 对象上的一个数组中
5.调用 resolve() 时遍历保存回调函数的数组并异步调用 (启动一个延迟时间为 0 的定时器来模拟队列) 成功的回调函数 onResolved()
6.调用 reject() 时同 5
7.当传进两个回调函数中的值不会 pending 时直接 return，防止重复调用
--- 以上无法处理抛出异常及 pending 状态的情况，但基本功能已经实现，以下对.then() 进行完善 ---
8.去掉 4，判断当前 promise 的状态 (pending/resolved/rejected) 并根据状态分情况进行下一步操作
  ①状态为 resolved 时，异步调用 onResolved()
  ②状态为 rejected 时，异步调用 onRejected()
  ③状态为 pending 时，将两个回调函数以对象的形式保存到 promise 对象上的一个数组中
9.由于.then() 会返回一个新的 promise，故将 8 的代码放到.then() 下返回的新的 promise 中了，新的 promise 具有以下三种情况：
  ①抛出 error  ==>  变为 rejected, 结果值为 error
  ②返回值不是 promise  ==>  变为 resolved, 结果值为返回值
  ③返回值是 promise  ===>  由这个 promise 的决定新的 promise 的结果 (成功/失败)
10.当前 promise 状态为 resolved 时，异步调用 onResolved() 的同时并进行 try catch 捕获，catch 时调用新 promise 的 reject()
11.在调用 onResolved() 的同时保存返回结果，并使用 instanceof 判断返回结果是否为 promise
12.当返回结果不是 promise 时，调用 resolve() 并传入返回结果
13.当返回结果是 promise 时，分成功失败情况调用 resolve() 和 reject()，并分别传入 value 和 reason
14.当 promise 状态为 rejected 同 10/11/12/13，只有异步调用 onRejected()
15.当 promise 状态为 pending 时，去掉 8.④，在调用函数时 (注意非异步) 外层包裹函数后同 10/11/12/13
16.合并共有函数简化代码
17.当.then() 中只指定了成功或失败的其中一种，恰巧传入的是未指定的一种，此时就为 undefined，则需要对
   onResolved() 和 onRejected() 进行判断，当未指定时则向下传递
--- 一下是对.catch() 进行完善 ---
18..catch() 本质上是.then() 的语法糖，同时只存在 onRejected()，故返回一个.then() 并将 onResolved() 指定为空即可
*/
(function (window) {

  const PENDING = 'pending' // 初始未确定的状态
  const RESOLVED = 'resolved' // 成功的状态
  const REJECTED = 'rejected' // 失败的状态

  /* 
  Promise 构造函数
  */
  function Promise(executor) {
    const self = this // Promise 的实例对象
    self.status = PENDING // 状态属性，初始值为 pending, 代表初始未确定的状态
    self.data = undefined // 用来存储结果数据的属性，初始值为 undefined
    self.callbacks = []  // {onResolved(){}, onRejected(){}}

    /* 
    将 promise 的状态改为成功，指定成功的 value
    */
    function resolve(value) {
      // 如果当前不是 pending, 直接结束
      if (self.status !== PENDING) return

      self.status = RESOLVED // 将状态改为成功
      self.data = value // 保存成功的 value

      // 异步调用所有缓存的待执行成功的回调函数
      if (self.callbacks.length > 0) {
        // 启动一个延迟时间为 0 的定时器，在定时器的回调中执行所有成功的回调
        setTimeout(() => {
          self.callbacks.forEach(cbsObj => {
            cbsObj.onResolved(value)
          })
        })
      }
    }

    /* 
    将 promise 的状态改为失败，指定失败的 reason
    */
    function reject(reason) {
      // 如果当前不是 pending, 直接结束
      if (self.status !== PENDING) return

      self.status = REJECTED // 将状态改为失败
      self.data = reason // 保存 reason 数据

      // 异步调用所有缓存的待执行失败的回调函数
      if (self.callbacks.length > 0) {
        // 启动一个延迟时间为 0 的定时器，在定时器的回调中执行所有失败的回调
        setTimeout(() => {
          self.callbacks.forEach(cbsObj => {
            cbsObj.onRejected(reason)
          })
        })
      }
    }

    // 调用 executor 来启动异步任务
    try {
      executor(resolve, reject)
    } catch (error) { // 执行器执行出错，当前 promise 变为失败
      console.log('-----')
      reject(error)
    }

  }

  /* 
  用来指定成功/失败回调函数的方法
      1). 如果当前 promise 是 resolved, 异步执行成功的回调函数 onResolved
      2). 如果当前 promise 是 rejected, 异步执行成功的回调函数 onRejected
      3). 如果当前 promise 是 pending, 保存回调函数
  返回一个新的 promise 对象
      它的结果状态由 onResolved 或者 onRejected 执行的结果决定
      2.1). 抛出 error ==> 变为 rejected, 结果值为 error
      2.2). 返回值不是 promise   ==> 变为 resolved, 结果值为返回值
      2.3). 返回值是 promise    ===> 由这个 promise 的决定新的 promise 的结果 (成功/失败)
  */
  Promise.prototype.then = function (onResolved, onRejected) {
    const self = this

    onResolved = typeof onResolved === 'function' ? onResolved : value => value // 将 value 向下传递
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason } // 将 reason 向下传递

    return new Promise((resolve, reject) => { // 什么时候改变它的状态

      /* 
      1. 调用指定的回调函数
      2. 根据回调执行结果来更新返回 promise 的状态
      */
      function handle(callback) {
        try {
          const result = callback(self.data)
          if (!(result instanceof Promise)) { //  2.2). 返回值不是 promise   ==> 变为 resolved, 结果值为返回值
            resolve(result)
          } else { // 2.3). 返回值是 promise    ===> 由这个 promise 的决定新的 promise 的结果 (成功/失败)
            result.then(
              value => resolve(value),
              reason => reject(reason)
            )
            // result.then(resolve, reject)
          }
        } catch (error) { // 2.1). 抛出 error ==> 变为 rejected, 结果值为 error
          reject(error)
        }
      }

      if (self.status === RESOLVED) {
        setTimeout(() => {
          handle(onResolved)
        })
      } else if (self.status === REJECTED) {
        setTimeout(() => {
          handle(onRejected)
        })
      } else { // PENDING
        self.callbacks.push({
          onResolved(value) {
            handle(onResolved)
          },
          onRejected(reason) {
            handle(onRejected)
          }
        })
      }
    })
  }

  /* 
  用来指定失败回调函数的方法
  catch 是 then 的语法糖
  */
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
  }

  /* 
  用来返回一个指定 vlaue 的成功的 promise
  value 可能是一个一般的值，也可能是 promise 对象
  */
  Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
      // 如果 value 是一个 promise, 最终返回的 promise 的结果由 value 决定
      if (value instanceof Promise) {
        value.then(resolve, reject)
      } else { // value 不是 promise, 返回的是成功的 promise, 成功的值就是 value
        resolve(value)
      }
    })
  }

  /* 
  用来返回一个指定 reason 的失败的 promise
  */
  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  /* 
  返回一个 promise, 只有当数组中所有 promise 都成功才成功，否则失败
  */
  Promise.all = function (promises) {
    return new Promise((resolve, reject) => {

      let resolvedCount = 0 // 已经成功的数量 
      const values = new Array(promises.length) // 用来保存成功 promise 的 value 值
      // 遍历所有 promise, 取其对应的结果
      promises.forEach((p, index) => {
        p.then(
          value => {
            resolvedCount++
            values[index] = value
            if (resolvedCount === promises.length) { // 都成功了
              resolve(values)
            }
          },
          reason => reject(reason)
        )
      })
    })
  }

  /* 
  返回一个 promise, 由第一个完成 promise 决定
  */
  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      // 遍历所有 promise, 取其对应的结果
      promises.forEach(p => {
        // 返回的 promise 由第一个完成 p 来决定其结果
        p.then(resolve, reject)
      })
    })
  }

  /* 
  返回一个延迟指定时间才成功 (也可能失败) 的 promise
  */
  Promise.resolveDelay = function (value, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 如果 value 是一个 promise, 最终返回的 promise 的结果由 value 决定
        if (value instanceof Promise) {
          value.then(resolve, reject)
        } else { // value 不是 promise, 返回的是成功的 promise, 成功的值就是 value
          resolve(value)
        }
      }, time)
    })
  }

  /* 
  返回一个延迟指定时间才失败的 promise
  */
  Promise.rejectDelay = function (reason, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason)
      }, time)
    })
  }

  // 向外暴露 Promise
  window.Promise = Promise

})(window)