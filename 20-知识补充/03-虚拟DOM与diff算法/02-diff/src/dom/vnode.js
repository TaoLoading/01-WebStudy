/**
 * 创建虚拟节点
 */

export default function vnode(sel, data, children, text, elm) {
  let key = data.key
  return {
    sel,
    data,
    children,
    text,
    elm,
    key
  }
}