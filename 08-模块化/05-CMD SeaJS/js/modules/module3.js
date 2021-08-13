/*
* 定义一个没有依赖的模块，module3
* */

define(function (require,exports,module) {
  let data = '--------module3---------'

  function getData() {
    console.log(data)
  }

  module.exports = {getData}

})