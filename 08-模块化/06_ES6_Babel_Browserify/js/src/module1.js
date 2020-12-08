/*
 * module1使用【分别暴露】的方式
 * */

export let data = 'atguigu'

export function demo1() {
	console.log(`我是module1里的demo函数`, data.toUpperCase())
}

export function test1() {
	console.log('我是module1里的test函数', data.toLowerCase())
}

//以下代码与暴露无关，是module1内部自己在用的东西
/*
let a = 1
console.log(a)
alert(1)
*/
