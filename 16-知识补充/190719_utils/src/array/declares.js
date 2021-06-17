
export function map (array, callback) {
  const arr = []
  // 遍历当前数组每个元素, 调用callback得到一个结果数据, 添加arr
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const result = callback(element, index)
    arr.push(result)
  }
  return arr
}

export function reduce (array,callback, initValue) {
  // 结果为初始值
  let total = initValue
  // 遍历当前数组每个元素, 调用callback得到一个累加的结果数据
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    total = callback(total, element, index)
  }

  // 返回结果
  return total
}  

export function filter (array,callback) {
  const arr = []
  // 遍历当前数组每个元素, 调用callback得到一个布尔值, 如果为true, 将当前element添加到arr
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const result = callback(element, index)
    if (result) {
      arr.push(element)
    }
  }
  return arr
}  

export function find (array,callback) {
  // 遍历当前数组每个元素, 调用callback得到一个布尔值, 如果为true, 返回当前元素
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const result = callback(element, index)
    if (result) {
      return element
    }
  }
  return undefined
}  

export function findIndex (array,callback) {
  // 遍历当前数组每个元素, 调用callback得到一个布尔值, 如果为true, 返回当前元素的下标
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const result = callback(element, index)
    if (result) {
      return index
    }
  }
  return -1
}  

export function every (array,callback) {
  // 遍历当前数组每个元素, 调用callback得到一个布尔值, 一旦是false, 返回false
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const result = callback(element, index)
    if (!result) {
      return false
    }
  }
  return true
}  

export function some (array,callback) {
  // 遍历当前数组每个元素, 调用callback得到一个布尔值, 一旦是true, 返回true
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const result = callback(element, index)
    if (result) {
      return true
    }
  }
  return false
}  