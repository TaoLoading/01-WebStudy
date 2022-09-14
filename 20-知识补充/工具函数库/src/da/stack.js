/* 
自定义栈类型 Stack
*/

function Stack () {

  // 用于保存元素数据的数组
  const arr = []

  /* 
    1. 如果不判断, 问题是创建多个stack总是使用最后创建的arr
    2. 如果有判断, 问题是创建多个stack总是使用第一个创建的arr
      原型对象上的方法不要重新定义
  */

  // 将这些方法放到Stack()函数内部，是因为放在外部无法获取到arr。若通过this.arr的形式定义arr，虽然在外面能拿到arr，但更改了window

  // 压栈: push()
  // Stack.prototype.push = function (element) {
  this.push = function (element) {
    arr.push(element)
  }

  // 出栈: pop()
  this.pop = function () {
    // return arr.splice(arr.length-1, 1)
    return arr.pop()
  }

  // 查看栈顶: peek()
  this.peek = function () {
    return arr[arr.length - 1]
  }
  // 栈中元素个数: size()
  this.size = function () {
    return arr.length
  }
  // 是否是空栈: isEmpty()
  this.isEmpty = function () {
    return arr.length === 0
  }
}
export default Stack