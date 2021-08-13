// 主文件，用于汇总各个模块
// 注意：引入自定义模块时，必须要写路径；引入第三方模块时，只写模块名即可

let module1 = require('./modules/module1')
let module2 = require('./modules/module2')
let module3 = require('./modules/module3')
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
