/*
 * 1.Node中任何一个模块（js文件）都被一个外层函数所包裹
 *   function (exports, require, module, __filename, __dirname) {}
 *       exports：用于支持CommonJs模块化规范的暴露语法
 *       require：用于支持CommonJs模块化规范的引入语法
 *       module：用于支持CommonJs模块化规范的暴露语法
 *       __filename：当前运行文件的绝对路径
 *       __dirname：当前运行文件所在文件夹的绝对路径
 *
 * 2.为什么要设计这个外层函数（这个外层函数有什么作用？）
 *     1).用于支持模块化语法
 *     2).隐藏服务器内部实现(从作用域角度去看)
 *
 * */

// 通过arguments.callee输出外层函数(加toString()是为了在终端中查看)
// console.log(arguments.callee.toString()) // 输出外层函数

// 如何在一个函数体里，输出函数本身？
/*function demo() {
  console.log(arguments.callee.toString()) // 输出demo函数
}*/

// 当前文件所在的绝对路径
console.log(__filename) // d:\workplace\001-web\09-Node\1.Node中函数的特点\node_function.js

// 当前文件夹所在的绝对路径
console.log(__dirname) // d:\workplace\001-web\09-Node\1.Node中函数的特点
