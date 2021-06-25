/* 
2. 自定义instanceof工具函数
    语法: myInstanceOf(obj, Type)
    功能: 判断obj是否是Type类型的实例
    实现: Type的原型对象是否是obj的原型链上的某个对象, 如果是返回tru, 否则返回false
*/

export function myInstanceOf(obj, Type) {
  // 得到一个原型对象
  let protoObj = obj.__proto__
  while (protoObj!==null) { // 存在原型对象
    // 如果就是Type的原型对象, 直接返回true
    if (protoObj===Type.prototype) {
      return true
    } 
    // 取出下一个原型对象, 并保存
    protoObj = protoObj.__proto__
  }
  // 出了循环, 说明类型不匹配
  return false
}