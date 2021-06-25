/* 
实现浅拷贝
        方法一: 利用ES6语法
        方法二: 利用ES5语法: for...in
*/

/* 
方法一: 利用ES6语法
*/
export function clone1 (target) {
  if (target instanceof Array) {
    // return [...target]
    // return target.slice()
    // return [].concat(target)
    // return Array.from(target)
    // return target.filter(value => true)
    // return target.map(item => item)
    return target.reduce((pre, item) => {
      pre.push(item)
      return pre
    }, [])
  } else if (target!==null && typeof target==='object') {
    return {...target}
  } else {// 如果不是数组或对象, 直接返回
    return target
  }
}

export function clone2 (target) {
  // 被处理的目标是数组/对象
  if (target instanceof Array || (target!==null && typeof target==='object')) {
    const cloneTarget = target instanceof Array ? [] : {}
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = target[key]
      }
    }
    return cloneTarget
  } else {
    return target
  }
}