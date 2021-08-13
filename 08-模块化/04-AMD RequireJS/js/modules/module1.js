/*
* 定义一个没有依赖的module1
* */

define(function () {
  //数据-----私有数据（只读）
  let data = 'atguigu'
  //获取数据的方法
  function getDataL() {
    return data.toLowerCase()
  }
  function getDataU() {
    return data.toUpperCase()
  }
  return {getDataL,getDataU}
})

