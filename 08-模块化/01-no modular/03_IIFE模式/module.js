/**
 * IIFE模式: 匿名函数自调用(闭包)
 * IIFE : immediately-invoked function expression(立即调用函数表达式)
 * 作用: 数据是私有的, 外部只能通过暴露的方法操作
 * 问题: 如果当前这个模块依赖另一个模块怎么办?
 */

;((window) => {
	// 内部数据，不允许在外部修改
	let data = 'this data'

	function test() {
		console.log(data)
	}
	function test2() {
		console.log(data.toUpperCase)
	}

	// 向外暴露方法，但如果方法多的话则都要添加给window，不方便
	// window.test = test
	// window.test2 = test2

	// 向外暴露方法
	// let obj = {
	// 	test: test,
	// 	test2: test2,
	// }
	// 简写
	let modular = { test, test2 }
	window.modular = modular
})()
