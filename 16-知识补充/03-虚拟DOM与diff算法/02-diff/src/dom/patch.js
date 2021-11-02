/**
 * 替换节点
 */

import createElement from "./createElement"
import vnode from "./vnode"
import patchVnode from './patchVnode'

export default function patch(oldVnode, newVnode) {
  // 判断老节点是否为虚拟节点
  if (oldVnode.sel == undefined) {
    // 若老节点没有sel属性，则证明为真实节点，将其转换为虚拟节点方便节点的替换
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(), // sel
      {}, // data
      [], // children
      undefined, // text
      oldVnode // elm
    )
  }

  // 判断老虚拟节点和新虚拟节点是否为同一个节点
  if (oldVnode.sel === newVnode.sel) {
    patchVnode(oldVnode, newVnode)
  } else {
    // 不为同一个节点，则暴力删除老节点创建新节点

    // 将虚拟节点创建为dom节点
    let newVnodeElm = createElement(newVnode)
    // 获取老节点的真实DOM节点
    let oldVnodeElm = oldVnode.elm
    // 插入新节点
    if (newVnodeElm) {
      oldVnodeElm.parentNode.insertBefore(newVnodeElm, oldVnodeElm)
    }
    // 删除老节点
    oldVnodeElm.parentNode.removeChild(oldVnodeElm)
  }
}