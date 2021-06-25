export function apply (fn, obj, args) {
  // 处理obj是undefined或者null的情况
  if (obj===undefined || obj===null) {
    obj = window
  }

  // 给obj添加一个方法: tempFn: this
  obj.tempFn = fn
  // 调用obj的tempFn方法, 传入rags参数, 得到返回值
  const result = obj.tempFn(...args)
  // 删除obj上的temFn
  delete obj.tempFn
  // 返回方法的返回值
  return result

  // return call(fn, obj, ...args)
}

