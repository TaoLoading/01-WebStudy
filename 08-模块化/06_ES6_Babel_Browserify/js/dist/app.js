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