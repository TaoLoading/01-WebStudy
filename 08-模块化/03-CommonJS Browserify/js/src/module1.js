// 第一种暴露方式：module.exports = value
// 即给module追加一个属性，值为value

module.exports = {
	data: 'this data',
	test() {
		console.log(this.data)
	},
}
