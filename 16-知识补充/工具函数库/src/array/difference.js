/* 
difference(arr1, arr2): 得到当前数组中所有不在arr中的元素组成的数组(不改变原数组)
        如: difference([1,3,5,7], [5, 8])  ==> [1, 3, 7]
*/
import {filter} from './declares'

export function difference(arr1, arr2) {

  // 处理特别情况
  if (arr1.length===0) {
    return []
  } else if (arr2.length===0) {
    return [...arr1]
  }
  
  // 对数组进行过滤
  return filter(arr1, item => arr2.indexOf(item)===-1)
}

export function differences(arr1, ...arrays) {

  // 处理特别情况
  if (arr1.length===0) {
    return []
  } else if (arrays.length===0) {
    return [...arr1]
  }
  
  // 对数组进行过滤
  return filter(arr1, item => {
    let result = true // 假设当前元素在后面的所有数组都不存在
    /* arrays.forEach(array => {
      const index = array.indexOf(item)
      if (index!==-1) {
        result = false
      }
    }) */
    for (let index = 0; index < arrays.length; index++) {
      const array = arrays[index];
      if (array.indexOf(item)!==-1) {
        result = false
        break // 结束当前for循环
      }
    }
    return result
  })
}