(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// 主文件，用于汇总各个模块
// 注意：引入自定义模块时，必须要写路径；引入第三方模块时，只写模块名即可

let module1 = require('./module1')
let module2 = require('./module2')
let module3 = require('./module3')
let uniq = require('uniq')

// 使用暴露的内容
console.log(module1.data)
module1.test()
module2.haha()
console.log(module3.peiqi) // undefined
module3() // 哈哈
console.log(uniq([1, 2, 3, 4, 3, 11, 6, 7, 8]))

// 验证module.exports和exports的内置关系
console.log(module.exports === exports) // true
console.log(module.exports)
console.log(exports)

},{"./module1":2,"./module2":3,"./module3":4,"uniq":5}],2:[function(require,module,exports){
// 第一种暴露方式：module.exports = value
// 即给module追加一个属性，值为value

module.exports = {
	data: 'this data',
	test() {
		console.log(this.data)
	},
}

},{}],3:[function(require,module,exports){
// 第二种暴露方式：exports.xxx = value
// 即为exports追加一个属性，值为value

exports.haha = function () {
	console.log('this is module2')
}

},{}],4:[function(require,module,exports){
// 1.暴露的本质是module.exports所指向的对象
// 2.在CommonJs模块规范中，module.exports和exports指向同一个对象，不能混用
// 3.如果混用，则以module.exports的指向为主

// 给exports指向的对象添加peiqi属性
exports.peiqi = [1, 3, 5, 7, 9]

// 更改module.exports指向到haha()
module.exports = function haha() {
	console.log('哈哈')
}

},{}],5:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}]},{},[1]);
