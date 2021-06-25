/* 
1. pull(array, ...values): 
        删除数组中与value相同的元素, 返回所有删除元素的数组
        说明: 数组发生了改变
        如: pull([1,3,5,3,7], 2, 7, 3, 7) ===> 数组变为[1, 5], 返回值为[3,3,7]
    2. pullAll(array, values): 
        功能与pull一致, 只是参数变为数组
        如: pullAll([1,3,5,3,7], [2, 7, 3, 7]) ===> 数组变为[1, 5], 返回值为[3,3,7]
*/

export function pull(array, ...values) {
  const result = []

  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (values.indexOf(item)!==-1) {// 如果有
      // 删除item
      array.splice(index, 1)
      // 将item添加到result数组
      result.push(item)
      index-- // 如果不做, 下一个元素就没有得到遍历
    }
  }

  return result
}

export function pullAll(array, values) {

  return pull(array, ...values)
}