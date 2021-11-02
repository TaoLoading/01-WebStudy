/**
 * 根据节点类型配合vnode()创建虚拟节点
 */

import vnode from "./vnode"

export default function h(sel, data, params) {
  if (typeof params == 'string') {
    // 当params类型为字符串时，则该元素没有子元素，传入相应参数
    return vnode(sel, data, undefined, params, undefined)
  } else if (Array.isArray(params)) {
    // 当params类型为数组时，则该元素有子元素，遍历获取所有子元素，并传入相应参数
    let children = []
    for (let item of params) {
      children.push(item)
    }
    return vnode(sel, data, children, undefined, undefined)
  }
}