/* 
自定义一个优先级队列
*/

function PriorityQueue() {

  // 用于保存元素数据的数组
  const arr = [] // 保存的元素结构: {data, priority}


  /* 队列每个元素的类型 */
  function QueueElement(data, priority) {
    this.data = data
    this.priority = priority
  }
  
  // 入队列: enqueue()
  this.enqueue = function (data, priority) {
    // 要求priority在[0, 100]之间, 否则抛出异常
    if (priority<0 || priority>100) {
      throw new Error('优先级值必须在0到100之间')
    }
    // 创建一个新的元素
    const element = new QueueElement(data, priority)

    // 将element添加到内部的arr中
    // 如果当前是空的, 直接添加
    if (arr.length===0) {
      arr.push(element)
    } else { // 将当前element插入到arr中的一个合适: 在priority值大于当前值的左边
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].priority > priority) {
          arr.splice(index, 0, element)
          return
        }
      }
      // 当前要添加的priority是最大的
      arr.push(element)
    }
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



export default PriorityQueue