/*
* 主js文件，用于汇总各个模块
* */

define(function (require) {
  let module1 = require('./module1')
  let module4 = require('./module4')
  module1.getData()
  module4.getData()
})