/*
 * module3使用【默认暴露】，只能暴露一次，重复暴露会报错
 * */

// 默认暴露直接把需要暴露的内容放到对象里
export default {
	name: 'peiqi',
	age: 18,
	speak() {
		setTimeout(() => {
			console.log(`我的名字是${this.name}，我的年龄是${this.age}`)
		}, 1000)
	},
}
