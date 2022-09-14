/* 
用来返回防抖函数的工具函数
*/
export function debounce(callback, delay) {
  return function (event) {

    // 如果上次事件还没有真正处理, 取消它
    // if (callback.timeoutId) { // 会查找原型链
    if (callback.hasOwnProperty('timeoutId')) { // 不会查找原型链
      // 清除
      clearTimeout(callback.timeoutId)
    }

    // 发事件发生指定事件后才调用处理事件的回调函数
    // 启动定时器, 只是准备真正处理
    callback.timeoutId = setTimeout(() => {
      // 正在处理事件
      callback.call(this, event)
      // 删除准备处理的标记
      delete callback.timeoutId
    }, delay)
  }
}