/**
 * 新老节点为同一个节点时处理情况
 */

 import createElement from "./createElement"
 import updateChildren from "./updateChildren"
 
 export default function patchVnode(oldVnode, newVnode) {
   // 判断新节点是否有子节点
   if (newVnode.children == undefined) {
     if (newVnode.text !== oldVnode.text) {
       // 当新节点没有子节点并且文本不相同时，将老节点的文本替换为新节点的文本
       oldVnode.elm.innerText = newVnode.text
     }
   } else {
     // 判断老节点是否有子节点
     if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
       // diff核心(最复杂)
       updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
     } else {
       // 老节点没有子节点时，将老节点清空并完成新节点的添加
       oldVnode.elm.innerHTML = ''
       for (let item of newVnode.children) {
         let childDom = createElement(item)
         oldVnode.elm.appendChild(childDom)
       }
     }
   }
 }