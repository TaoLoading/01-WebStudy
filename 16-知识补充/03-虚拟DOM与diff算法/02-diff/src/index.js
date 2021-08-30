import h from './dom/h'
import patch from './dom/patch'

// 获取真实DOM节点
let container = document.getElementById('container')

// 虚拟节点
let vnode1 = h('h1', {}, '你好')
let vnode2 = h('div', {}, '你好')
let vnode3 = h('ul', {}, [
  h('li', {}, 'a'),
  h('li', {}, 'b'),
  h('li', {}, 'c'),
  h('li', {}, '天若有情天亦老')
])
let vnode4 = h('ul', {}, [
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'd' }, '天若有情天亦老')
])
console.log(vnode4)
let vnode5 = h('ul', {}, [
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'd' }, '天若有情天亦老')
])

// 替换节点
patch(container, vnode4)
