/* 
1. 理解: 
    取出嵌套数组(多维)中的所有元素放到一个新数组(一维)中
    如: [1, [3, [2, 4]]]  ==>  [1, 3, 2, 4]
2. 实现:
    方法一: 递归 + reduce() + concat()
    方法二: ... + some() + concat()
*/
import { reduce, some } from './declares'
import { concat } from './concat'

/* 
方法一: 递归 + reduce() + concat()
*/
export function flatten1 (array) {
  return reduce(array, (pre, item) => {
    if (!Array.isArray(item)) {
      pre.push(item)
    } else {
      pre = concat(pre, flatten1(item))
    }
    return pre
  }, [])
} // [1, 3, [2, 4]]

/* 
[1, [3, [2, 4]]]

[1]

[3]

[2, 4]

[1, 3, 2, 4]
*/

/* 
方法二: ... + some() + concat()
*/
export function flatten2 (array) {
  let arr = concat([], ...array)
  while(some(arr, item => Array.isArray(item))) { // arr中有元素是数组
    arr = concat([], ...arr)
  }

  return arr
} 
