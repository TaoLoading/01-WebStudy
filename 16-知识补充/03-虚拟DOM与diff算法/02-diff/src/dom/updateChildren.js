/**
 * 新老节点为同一个节点，且新老节点都有子节点时处理情况
 * 
 * 参数一：真实DOM节点
 * 参数二：老的子节点
 * 参数三：新的子节点
 */

export default function updateChildren(parentElm, oldCh, newCh) {
  /**
   * 替换规则：
   * 1. 老前 VS 新前。匹配则老前指针++，新前指针++
   * 2. 老后 VS 新后。匹配则老后指针--，新后指针--
   * 3. 老前 VS 新后。匹配则老前指针++，新后指针--
   * 4. 老后 VS 新前。匹配则老后指针--，新前指针++
   * 5. 不满足前四种条件时，
   * 6. 不满足前五种条件时，创建新节点
   */

  let oldStartIdx = 0 // 老前的指针
  let newStartIdx = 0 // 新前的指针
  let oldEndIdx = oldCh.length - 1 // 老后的指针
  let newEndIdx = newCh.length - 1 // 新后的指针

  let oldStartVnode = oldCh[0] // 老前的子节点
  let newStartVnode = newCh[0] // 新前的子节点
  let oldEndVnode = oldCh[oldEndIdx] // 老后的子节点
  let newEndVnode = newCh[newEndIdx] // 新后的子节点

  // 判断两个节点是否为同一个
  function sameVnode(vNode1, vNode2) {
    return vNode1.key == vNode2.key
  }

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (sameVnode(oldStartIdx, newStartIdx)) {
      // 老前 VS 新前
    } else if (sameVnode(oldEndIdx, newEndIdx)) {
      // 老后 VS 新后
    } else if (sameVnode(oldStartIdx, newEndIdx)) {
      // 老前 VS 新后
    } else if (sameVnode(oldEndIdx, newStartIdx)) {
      // 老后 VS 新前
    } else {
      // 查找
    }
  }
}