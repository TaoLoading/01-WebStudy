/* 
自定义队列类型
使用数组封装
    入队列: enqueue()
    出队列: dequeue()
    查看队头: front()
    查看元素的个数: size()
    判断队列是否为空: isEmpty()
*/
function Queue() {

  // 用于保存元素数据的数组
  const arr = []

  
  // 入队列: enqueue()
  this.enqueue = function (element) {
    arr.push(element)
  }

  // 出队列: dequeue()
  this.dequeue = function () {
    return arr.shift()
  }

  // 查看队头: front()
  this.front = function () {
    return arr[0]
  }
  // 查看元素的个数: size()
  this.size = function () {
    return arr.length
  }
  // 判断队列是否为空: isEmpty()
  this.isEmpty = function () {
    return arr.length===0
  }
}



export default Queue