/**
 * 新老节点为同一个节点，且新老节点都有子节点时处理情况
 * 
 * 参数一：真实DOM节点
 * 参数二：老的子节点
 * 参数三：新的子节点
 */

import patchVnode from "./patchVnode"
import createElement from "./createElement"

export default function updateChildren(parentElm, oldCh, newCh) {
  /**
   * 替换规则：
   * 1. 老前 VS 新前。匹配则老前指针++，新前指针++
   * 2. 老后 VS 新后。匹配则老后指针--，新后指针--
   * 3. 老前 VS 新后。匹配则老前指针++，新后指针--
   * 4. 老后 VS 新前。匹配则老后指针--，新前指针++
   * 5. 不满足前四种条件时，
   * 6. 不满足前五种条件时，创建新节点
   * 7. 当新老节点个数不一样时，删除或添加
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
    return (vNode1.key == vNode2.key && vNode1.sel == vNode2.sel)
  }

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == undefined) {
      oldStartVnode = oldCh[++oldStartIdx]
    }
    if (oldEndVnode == undefined) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      console.log('情况一')
      // 情况一：老前 VS 新前
      patchVnode(oldStartVnode, newStartVnode)
      if (newStartVnode) {
        newStartVnode.elm = oldStartVnode?.elm
      }
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]

    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      console.log('情况二')
      // 情况二：老后 VS 新后
      patchVnode(oldEndVnode, newEndVnode)
      if (newEndVnode) {
        newEndVnode.elm = oldEndVnode?.elm
      }
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]

    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      console.log('情况三')
      // 情况三：老前 VS 新后
      patchVnode(oldStartVnode, newEndVnode)
      if (newEndVnode) {
        newEndVnode.elm = oldEndVnode?.elm
        /* console.log('newEndVnode.elm是', newEndVnode.elm)
        console.log('oldEndVnode.elm是', oldEndVnode.elm) */
      }
      // 把老前指定的节点移动到老后指向节点的后面
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]

    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      console.log('情况四')
      // 情况四：老后 VS 新前
      patchVnode(oldEndVnode, newStartVnode)
      if (newStartVnode) {
        newStartVnode.elm = oldEndVnode?.elm
      }
      // 把老后指定的节点移动到老前指向节点的前面
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      console.log('情况五')
      // 情况五：查找
      // 创建对象存取老节点
      const keyMap = {}
      for (let i = oldStartIdx; i < oldEndIdx; i++) {
        const key = oldCh[i]?.key
        if (key) {
          keyMap[key] = i
        }
      }
      // 在该对象上查找新前指向的新节点是否存在
      let idxInOld = keyMap[newStartVnode.key]
      if (idxInOld) {
        // 如果存在，则说明老节点中存在该新节点，即该节点在新老节点中都存在
        const existNode = oldCh[idxInOld]
        patchVnode(existNode, newStartVnode)
        // 处理过的节点在老节点中设置为undefined
        oldCh[idxInOld] = undefined
        // 把该节点移动到老前指向节点的前面
        parentElm.insertBefore(existNode.elm, oldStartVnode.elm)
      } else {
        console.log('情况六')
        // 如果不存在，则说明老节点中不存在该新节点，则需要创建
        // 情况六：创建
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      }
      // 新前指针++
      newStartVnode = newCh[++newStartIdx]

    }
  }

  /**
   * 跳出循环则说明出现两种情况：
   * 1.oldStartIdx> oldEndIdx，此时新增节点
   * 2.newStartIdx> newEndIdx，此时删除节点
   */
  if (oldStartIdx > oldEndIdx) {
    // 新增
    console.log('发生新增')
    const before = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      parentElm.insertBefore(createElement(newCh[i]), before)
    }
  } else {
    // 删除
    console.log('发生删除')
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      parentElm.removeChild(oldCh[i].elm)
    }
  }
}