/* 
 1. 自定义new工具函数
  语法: newInstance(Fn, ...args)
  功能: 创建Fn构造函数的实例对象
  实现: 创建空对象obj, 调用Fn指定this为obj, 返回obj
*/

export function newInstance(Fn, ...args) {
  
  // 创建一个空对象
  const obj = {}
  

  // 调用Fn函数, 且指定this是新创建对象
  const result = Fn.apply(obj, args)
  
  // 如果Fn执行返回的是对象类型, 最终的结果就是这个对象
  if (result instanceof Object) {
    return result
  }

  // 让原型对象是空的object对象, 且constructor属性为Fn
  /* 
  obj.__proto__ = {}
  obj.__proto__.constructor = Fn
  问题: 创建每个实例的原型对象不是同一个(实际要求的是同一个)
  */
  obj.__proto__ = Fn.prototype  // 将构造函数的显示原型属性值赋值实例对象的隐式原型属性

  // 返回新建的对象
  return obj
}