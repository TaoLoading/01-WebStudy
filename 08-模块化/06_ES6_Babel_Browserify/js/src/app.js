/*
 * 主文件，用于汇总各个模块
 * */

// 在es6的模块化规范中，用哪一种方式引入，取决于用何种方式暴露的。
// 分别暴露和统一暴露采用import {xxx,yyy} form './module1'
// 默认暴露采用import xxx form './module3'
// 注意变量名不能重复，会报错

// 引入module1【分别暴露】
import { data, demo1, test1 } from './module1'
// 【另一种写法】：此种引入方式会将module1暴露的内容，收集成一个对象(haha)，用于避免命名冲突，输出时也要改为对象.方法的形式
// import * as haha from './module1'

// 引入module2【统一暴露】
import { demo2, test2 } from './module2'
// 【另一种写法】：(同上)
// import * as haha2 from './module2'

// 【另一种写法】：采用起别名的方式引入（module2里面给暴露的内容起了别名）
// import {haha1,haha2} from './module2'

// 引入module3【默认暴露】
import module3 from './module3'

// 如果模块是默认暴露的，尽量就不要用如下的写法，因为这种默认暴露本身就是把暴露的内容放到对象中
// import * as module3 from './module3'

// 引入module4，module4里用了多种暴露的方式，注意引入内容的书写方式
import module4, { arr0, bar, foo, str, student, d1 } from './module4'

// 引入第三方模块uniq，几乎所有的第三方模块，都用默认暴露的方式。
import uniq from 'uniq'

console.log(data)
demo1()
test1()
demo2()
test2()
/*console.log(module3.name)
console.log(module3.age)
module3.speak()*/
console.log(module3)
console.log(uniq([1, 3, 3, 3, 2, 5, 4, 6, 7, 9, 8, 11, 10]))
console.log(arr0, str, student, d1)
bar()
foo()
d1.run()
console.log(module4)
