/*
* 在AMD模块化中，主js文件(入口文件)需要写一个特殊的【配置对象】。
* */
requirejs.config({
  baseUrl: './js', //如果配置了baseUrl，项目的根目录了就是index.html所在目录

  //在项目中所有用到的模块，都要在这里注册
  paths: {
    module1: '/modules/module1',
    module2: '/modules/module2',
    jquery: '/lib/jquery-1.10.1'
  }
});

requirejs(['module2','jquery'],function (m2,$) {
  console.log($)
  console.log(m2());
  $('body').css('background','skyblue')
});
