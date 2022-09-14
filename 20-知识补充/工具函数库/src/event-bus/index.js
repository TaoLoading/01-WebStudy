const eventBus = {}

/* 
{
  add:  [callback1, callback2]
  delete: [callback3]
}
*/
let callbacksObj = {}

/* 
绑定事件监听
*/
eventBus.on = function (eventName, callback) {
  const callbacks = callbacksObj[eventName]
  if (callbacks) {
    callbacks.push(callback)
  } else {
    callbacksObj[eventName] = [callback]
  }
}

/* 
分发事件
*/
eventBus.emit = function (eventName, data) {
  const callbacks = callbacksObj[eventName]
  if (callbacks && callbacks.length > 0) {
    callbacks.forEach(callback => {
      callback(data)
    })
  }
}

/* 
移除事件监听
*/
eventBus.off = function (eventName) {
  if (eventName) {
    delete callbacksObj[eventName]
  } else {
    callbacksObj = {}
  }
}

export default eventBus