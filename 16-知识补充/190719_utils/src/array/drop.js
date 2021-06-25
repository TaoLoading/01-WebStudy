/* 
1. drop(array, count): 
    得到数组过滤掉左边count个后剩余元素组成的数组
    说明: 不改变当前数组, count默认是1
    如: drop([1,3,5,7], 2) ===> [5, 7]
2. dropRight(array, count): 
    得到数组过滤掉右边count个后剩余元素组成的数组
    说明: 不改变数组, count默认是1
    如: dropRight([1,3,5,7], 2) ===> [1, 3]   
*/

export function drop(array, count=1) {
  if (array.length==0) {
    return []
  }
  if (count<1) {
    count = 1
  }
  
  return array.filter((item, index) => index>=count)
}

export function dropRight(array, count=1) {
  if (array.length==0) {
    return []
  }
  if (count<1) {
    count = 1
  }
  
  return array.filter((item, index) => index<array.length-count)
}