const PENDING = 'pending' // 初始未确定的状态
const RESOLVED = 'resolved' // 成功的状态
const REJECTED = 'rejected' // 失败的状态

/* 
Promise构造函数
*/
function Promise(excutor) {

  const self = this // Promise的实例对象
  self.status = PENDING // 状态属性, 初始值为pending, 代表初始未确定的状态
  self.data = undefined // 用来存储结果数据的属性, 初始值为undefined
  self.callbacks = [] // {onResolved(){}, onRejected(){}}

  /* 
  将promise的状态改为成功, 指定成功的value
  */
  function resolve(value) {
    // 如果当前不是pending, 直接结束
    if (self.status !== PENDING) return

    self.status = RESOLVED // 将状态改为成功
    self.data = value // 保存成功的value

    // 异步调用所有缓存的待执行成功的回调函数
    if (self.callbacks.length > 0) {
      // 启动一个延迟时间为0的定时器, 在定时器的回调中执行所有成功的回调
      setTimeout(() => {
        self.callbacks.forEach(cbsObj => {
          cbsObj.onResolved(value)
        })
      })
    }
  }

  /* 
  将promise的状态改为失败, 指定失败的reason
  */
  function reject(reason) {
    // 如果当前不是pending, 直接结束
    if (self.status !== PENDING) return

    self.status = REJECTED // 将状态改为失败
    self.data = reason // 保存reason数据

    // 异步调用所有缓存的待执行失败的回调函数
    if (self.callbacks.length > 0) {
      // 启动一个延迟时间为0的定时器, 在定时器的回调中执行所有失败的回调
      setTimeout(() => {
        self.callbacks.forEach(cbsObj => {
          cbsObj.onRejected(reason)
        })
      })
    }
  }

  // 调用excutor来启动异步任务
  try {
    excutor(resolve, reject)
  } catch (error) { // 执行器执行出错, 当前promise变为失败
    console.log('-----')
    reject(error)
  }

}

/* 
用来指定成功/失败回调函数的方法
    1). 如果当前promise是resolved, 异步执行成功的回调函数onResolved
    2). 如果当前promise是rejected, 异步执行成功的回调函数onRejected
    3). 如果当前promise是pending, 保存回调函数
返回一个新的promise对象
    它的结果状态由onResolved或者onRejected执行的结果决定
    2.1). 抛出error ==> 变为rejected, 结果值为error
    2.2). 返回值不是promise   ==> 变为resolved, 结果值为返回值
    2.3). 返回值是promise    ===> 由这个promise的决定新的promise的结果(成功/失败)
*/
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this

  onResolved = typeof onResolved === 'function' ? onResolved : value => value // 将value向下传递
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {
    throw reason
  } // 将reason向下传递

  return new Promise((resolve, reject) => { // 什么时候改变它的状态

    /* 
    1. 调用指定的回调函数
    2. 根据回调执行结果来更新返回promise的状态
    */
    function handle(callback) {
      try {
        const result = callback(self.data)
        if (!(result instanceof Promise)) { //  2.2). 返回值不是promise   ==> 变为resolved, 结果值为返回值
          resolve(result)
        } else { // 2.3). 返回值是promise    ===> 由这个promise的决定新的promise的结果(成功/失败)
          result.then(
            value => resolve(value),
            reason => reject(reason)
          )
          // result.then(resolve, reject)
        }
      } catch (error) { // 2.1). 抛出error ==> 变为rejected, 结果值为error
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
catch是then的语法糖
*/
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

/* 
用来返回一个指定vlaue的成功的promise
value可能是一个一般的值, 也可能是promise对象
*/
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    // 如果value是一个promise, 最终返回的promise的结果由value决定
    if (value instanceof Promise) {
      value.then(resolve, reject)
    } else { // value不是promise, 返回的是成功的promise, 成功的值就是value
      resolve(value)
    }
  })
}

/* 
用来返回一个指定reason的失败的promise
*/
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

/* 
返回一个promise, 只有当数组中所有promise都成功才成功, 否则失败
*/
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {

    let resolvedCount = 0 // 已经成功的数量 
    const values = new Array(promises.length) // 用来保存成功promise的value值
    // 遍历所有promise, 取其对应的结果
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
返回一个promise, 由第一个完成promise决定
*/
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    // 遍历所有promise, 取其对应的结果
    promises.forEach(p => {
      // 返回的promise由第一个完成p来决定其结果
      p.then(resolve, reject)
    })
  })
}

/* 
返回一个延迟指定时间才成功(也可能失败)的promise
*/
Promise.resolveDelay = function (value, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 如果value是一个promise, 最终返回的promise的结果由value决定
      if (value instanceof Promise) {
        value.then(resolve, reject)
      } else { // value不是promise, 返回的是成功的promise, 成功的值就是value
        resolve(value)
      }
    }, time)
  })
}

/* 
返回一个延迟指定时间才失败的promise
*/
Promise.rejectDelay = function (reason, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(reason)
    }, time)
  })
}

export default Promise