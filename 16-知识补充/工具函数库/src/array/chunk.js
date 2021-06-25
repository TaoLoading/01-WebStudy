/* 
将数组拆分成多个 size 长度的区块，每个区块组成小数组,整体组成一个二维数组
*/

export function chunk(array, size=1) {
  const bigArr = []
  let smallArr = []
  // 如果是空数组, 直接返回空数组
  if (array.length===0) {
    return bigArr
  }
  // 处理size
  if (size<1) {
    size = 1
  } /* else if (size>array.length) {
    size = array.length
  } */

  array.forEach(item => {

    // 将小数组bigArr中(只能放一次)
    if (smallArr.length===0) {
      bigArr.push(smallArr)
    }

    // 将元素添加到小数组
    smallArr.push(item)

    // 限制smallArr的最大长度是size
    if (smallArr.length===size) {
      smallArr = []
    }
  })

  return bigArr
}