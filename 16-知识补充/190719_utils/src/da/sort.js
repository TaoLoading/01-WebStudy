/* 
3个基本的排序算法
*/

export function bubbleSort(arr) {
  for (let i = arr.length-1; i >0; i--) { //需要在 [0, i]
    for (let j = 0; j < i; j++) { // 依次拿出相邻的2个进行比较
      if (arr[j] > arr[j+1]) { // 需要交换位置
        // let temp = arr[j]
        // arr[j] = arr[j+1]
        // arr[j+1] = temp
        [arr[j+1], arr[j]] = [arr[j], arr[j+1]]
      }
    }
  }
  return arr
}

export function selectSort(arr) {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) { // 遍历未排序的区域
    // 将最小值的下标暂定为i
    let minIndex = i
    // 依次与它右侧元素比较
    for (let j = i+1; j < len; j++) {
      if (arr[minIndex] > arr[j]) {
        // 找到一个更小的值, 更新一下最小值的下标
        minIndex = j
      }
    }
    // 一旦minIndex有变化(发现最小值的下标不是i)
    if (minIndex!==i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }

  return arr
}

export function insertSort(arr) {
  const len = arr.length
  // 假设第一个元素已排序了
  for (let i = 1; i < len; i++) { // 遍历未排序的区域
    const start = arr[i]
    // 将start与左边的比较(从右向比)
    let j = i -1
    while(j>=0 && arr[j]>start) {
      arr[j+1] = arr[j] // 向右移位
      j--
    }
    arr[j+1] = start
  }

  return arr
}
