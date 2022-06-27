// 手写shallowReactive和reactive

// 定义reactiveHandler处理对象
const reactiveHandler = {
  // 获取属性值
  get(target, key) {
    console.log('拦截了读取数据');
    if (key === '_is_reactive') return true
    return Reflect.get(target, key)
  },
  // 修改或添加属性
  set(target, key, value) {
    const result = Reflect.set(target, key, value)
    console.log('拦截了修改或添加数据')
    return result
  },
  // 删除属性
  deleteProperty(target, key) {
    const result = Reflect.deleteProperty(target, key)
    console.log('拦截了删除数据')
    return result
  },
}

// 自定义shallowReactive
function shallowReactive(obj) {
  return new Proxy(obj, reactiveHandler)
}

// 自定义reactive
function reactive(target) {
  if (target && typeof target === 'object') {
    if (target instanceof Array) {
      // 类型为数组时
      // 由于是深度监视，故对数组中的数据进行reactive递归处理
      target.forEach((item, index) => {
        target[index] = reactive(item)
      })
    } else {
      // 类型为对象时
      // 由于是深度监视，故对对象中的数据进行reactive递归处理
      Object.keys(target).forEach(key => {
        target[key] = reactive(target[key])
      })
    }
    const proxy = new Proxy(target, reactiveHandler)
    return proxy
  }
  return target
}

// ================================

// 手写shallowReadonly和readonly

// 定义readonlyHandler处理对象
const readonlyHandler = {
  get(target, key) {
    if (key === '_is_readonly') return true

    return Reflect.get(target, key)
  },
  set() {
    console.warn('只读的, 不能修改')
    return true
  },
  deleteProperty() {
    console.warn('只读的, 不能删除')
    return true
  },
}

// 自定义shallowReadonly
function shallowReadonly(obj) {
  return new Proxy(obj, readonlyHandler)
}

// 自定义readonly
function readonly(target) {
  if (target && typeof target === 'object') {
    if (target instanceof Array) { // 数组
      target.forEach((item, index) => {
        target[index] = readonly(item)
      })
    } else { // 对象
      Object.keys(target).forEach(key => {
        target[key] = readonly(target[key])
      })
    }
    const proxy = new Proxy(target, readonlyHandler)
    return proxy
  }
  return target
}