/* 
自定义消息订阅与发布
*/

const PubSub = {}
/* 
  {
    add: {
      token1: callback1, 
      token2: callback2
    },
    update: {
      token3: callback3
    }
  }
*/
let callbacksObj = {} // 保存所有回调的容器
let id = 0 // 用于生成token的标记

// 1. 订阅消息
PubSub.subscribe = function (msgName, callback) {

  // 确定token
  const token = 'token_' + ++id
  // 取出当前消息对应的callbacks
  const callbacks = callbacksObj[msgName]
  if (!callbacks) {
    callbacksObj[msgName] = {
      [token]: callback
    }
  } else {
    callbacks[token] = callback
  }
  // 返回token
  return token
}


// 2. 发布异步的消息
PubSub.publish = function (msgName, data) {
  // 取出当前消息对应的callbacks
  let callbacks = callbacksObj[msgName]
  // 如果有值
  if (callbacks) {
    // callbacks = Object.assign({}, callbacks)
    // 启动定时器, 异步执行所有的回调函数
    setTimeout(() => {
      Object.values(callbacks).forEach(callback => {
        callback(data)
      })
    }, 0)
  }
}

// 3. 发布同步的消息
PubSub.publishSync = function (msgName, data) {
  // 取出当前消息对应的callbacks
  const callbacks = callbacksObj[msgName]
  // 如果有值
  if (callbacks) {
    // 立即同步执行所有的回调函数
    Object.values(callbacks).forEach(callback => {
      callback(data)
    })
  }
}

/*
4. 取消消息订阅
  1). 没有传值, flag为undefined
  2). 传入token字符串
  3). msgName字符串
*/
PubSub.unsubscribe = function (flag) {
  // 如果flag没有指定或者为null, 取消所有
  if (flag === undefined) {
    callbacksObj = {}
  } else if (typeof flag === 'string') {
    if (flag.indexOf('token_') === 0) { // flag是token
      // 找到flag对应的callbacks
      const callbacks = Object.values(callbacksObj).find(callbacks => callbacks.hasOwnProperty(flag))
      // 如果存在, 删除对应的属性
      if (callbacks) {
        delete callbacks[flag]
      }
    } else { // flag是msgName
      delete callbacksObj[flag]
    }

  } else {
    throw new Error('如果传入参数, 必须是字符串类型')
  }
}

export default PubSub