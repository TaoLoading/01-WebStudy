/* 
语法: var new_array = concat(array, value1[, value2[, ...[, valueN]]]) 
功能: 将n个数组或值与当前数组合并生成一个新数组, 原始数组不会被改变 
*/
export function concat (array, ...values) {
  const arr = [...array]
  // 遍历values, 将value或者value中的元素添加arr中
  values.forEach(value => {
    if (Array.isArray(value)) {
      arr.push(...value)
    } else {
      arr.push(value)
    }
  })
  
  return arr
}