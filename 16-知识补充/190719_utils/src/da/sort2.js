/* 
希尔排序
1. 计算出一系列增量值(折半法): 
    递减, 最后一个必须是1
    distance = length
    distance = Math.floor(distance/2)
2. 以当前增量对数组进行分组, 分成多个小数组
    对每个小数组进行插入排序
    每个小数组排序是交替进行
*/
function shellSort (arr) {
  const len = arr.length
  let distance = len
  while (distance>1) {
    distance = Math.floor(distance/2)
    console.log(distance)
    for (let i = distance; i < len; i++) { // 遍历未排序的区域
      const start = arr[i]
      // 将start与左边的比较(从右向比)
      let j = i -distance
      while(j>=0 && arr[j]>start) {
        arr[j+distance] = arr[j] // 向右移位
        j = j - distance
      }
      arr[j+distance] = start
    }
  }

  return arr
}

console.log(shellSort([5, 7, 9,3, 2, 6, 10, 1]))