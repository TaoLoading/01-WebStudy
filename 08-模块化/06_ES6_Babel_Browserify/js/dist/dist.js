(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _module = require('./module1');

var _module2 = require('./module2');

var _module3 = require('./module3');

var _module4 = _interopRequireDefault(_module3);

var _module5 = require('./module4');

var _module6 = _interopRequireDefault(_module5);

var _uniq = require('uniq');

var _uniq2 = _interopRequireDefault(_uniq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//如果模块是默认暴露的，尽量就不要用如下的写法
//import * as module3 from './module3'

//引入module4，module4里用了多种暴露的方式


//【另外一种写法】：引入module1，module1是【分别暴露】的，此种引入方式会将module1暴露的内容，收集成一个对象
//import * as haha from './module1'

//引入module2,module2是【统一暴露】的
console.log(_module.data);

//引入第三方模块uniq，几乎所有的第三方模块，都用默认暴露的方式。


//【另外一种写法】，引入module2,module2是【统一暴露】的，此种引入方式会将module2暴露的内容，收集成一个对象
//import * as haha2 from './module2'

//引入module2,module2是【统一暴露】的（module2里面给暴露的内容起了别名）
//import {haha1,haha2} from './module2'

//【引入module3,module3是默认暴露的】
/*
 * 主文件，用于汇总各个模块
 * */

// 在es6的模块化规范中，用哪一种方式引入，取决于用何种方式暴露的。
// 分别暴露和统一暴露采用import {xxx,yyy} form './module1'
// 默认暴露采用import xxx form './module3'

//引入module1，module1是【分别暴露】的

(0, _module.demo1)();
(0, _module.test1)();
(0, _module2.demo2)();
(0, _module2.test2)();
/*console.log(module3.name)
console.log(module3.age)
module3.speak()*/
console.log(_module4.default);
console.log((0, _uniq2.default)([1, 3, 3, 3, 2, 5, 4, 6, 7, 9, 8, 11, 10]));
console.log(_module5.arr0, _module5.str, _module5.student, _module5.d1);
(0, _module5.bar)();
(0, _module5.foo)();
_module5.d1.run();
console.log(_module6.default);
},{"./module1":2,"./module2":3,"./module3":4,"./module4":5,"uniq":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.demo1 = demo1;
exports.test1 = test1;
/*
 * module1使用【分别暴露】的方式
 * */

var data = exports.data = 'atguigu';

function demo1() {
  console.log('\u6211\u662Fmodule1\u91CC\u7684demo\u51FD\u6570', data.toUpperCase());
}

function test1() {
  console.log('我是module1里的test函数', data.toLowerCase());
}

//以下代码与暴露无关，是module1内部自己在用的东西
/*
let a = 1
console.log(a)
alert(1)*/
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * module2，使用的是【统一暴露】
 * */

//arr是私有数据，不去暴露
var arr = [1, 3, 5, 7, 9];

function demo2() {
  console.log('我是module2里的demo2函数', arr);
}

function test2() {
  console.log('我是module2里的test2函数', arr);
}

//统一暴露(精简版写法，不是对象的简写方式注意区分)
exports.demo2 = demo2;
exports.test2 = test2;

//统一暴露(完整版写法)
/*
export {
  demo2 as haha1, //暴露的同时可以，赋一个别名
  test2 as haha2
}*/
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/*
 * module3使用【默认暴露】，只能暴露一次。
 * */
exports.default = {
	name: 'peiqi',
	age: 18,
	speak: function speak() {
		var _this = this;

		setTimeout(function () {
			console.log('\u6211\u7684\u540D\u5B57\u662F' + _this.name + '\uFF0C\u6211\u7684\u5E74\u9F84\u662F' + _this.age);
		}, 1000);
	}
};
},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.bar = bar;
exports.foo = foo;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * 混合暴露
 * */

//分别暴露
var arr0 = exports.arr0 = [1, 3, 5, 7, 9, 10];

function bar() {
	console.log('module4-------bar()');
}

function foo() {
	console.log('module4-------foo()');
}

//统一暴露
var str = 'hello,atguigu';
var student = { name: 'peiqi', age: 18 };

var Dog = function () {
	function Dog(name, age) {
		_classCallCheck(this, Dog);

		this.name = name;
		this.age = age;
	}

	_createClass(Dog, [{
		key: 'run',
		value: function run() {
			console.log('我正在奔跑');
		}
	}]);

	return Dog;
}();

var d1 = new Dog('wc', 3);
exports.str = str;
exports.student = student;
exports.d1 = d1;

//默认暴露

exports.default = {
	school: 'atguigu',
	price: '15K'
};
},{}],6:[function(require,module,exports){
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
