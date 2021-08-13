/*
* 定义一个没有依赖的模块，module2
* */

define(function (require,exports,module) {
  let data = '--------module2---------'

  function getData() {
    console.log(data)
  }

  module.exports = {getData}

})