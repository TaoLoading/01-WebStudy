/**
 * 全局函数模式: 将不同的功能封装成不同的全局函数
 * 问题: 全局被污染了, 很容易引起命名冲突
 */

let data = 'this data'

function demo() {
	console.log(data)
}
