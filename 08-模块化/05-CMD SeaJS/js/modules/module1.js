/*
* 定义一个没有依赖的模块，module1
* */

define(function (require,exports,module) {
  let data = '--------module1---------'

  function getData() {
    console.log(data)
  }

  module.exports = {getData}

})
