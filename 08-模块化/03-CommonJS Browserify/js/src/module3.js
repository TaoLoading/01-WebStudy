// 1.暴露的本质是module.exports所指向的对象
// 2.在CommonJs模块规范中，module.exports和exports指向同一个对象，不能混用
// 3.如果混用，则以module.exports的指向为主

// 给exports指向的对象添加peiqi属性
exports.peiqi = [1, 3, 5, 7, 9]

// 更改module.exports指向到haha()
module.exports = function haha() {
	console.log('哈哈')
}
