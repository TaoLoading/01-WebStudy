// 自定义promise模块

;(function (window) {
	const PENDING = 'pending'
	const RESOLVED = 'resolved'
	const REJECTED = 'rejected'

	// promise构造函数
	function Promise(excutor) {
		// Promise的实例对象
		const self = this
		// 属性状态，初始为pending
		self.status = PENDING
		// 用于存储结果数据的属性，初始为undefined
		self.data = undefined

		// 将promise的状态改为成功并指定成功的value
		function resolve(value) {}
		// 将promise的状态改为失败并指定是失败的reason
		function reject(reason) {}

		// 调用excutor启动异步任务
		excutor(resolve, reject)
	}

	// 指定成功/失败回调函数的方法
	Promise.prototype.then = function (onResolved, onRejected) {}

	// 指定失败回调函数的方法
	Promise.prototype.catch = function (onRejected) {}

	// 返回一个指定value的成功的promise
	Promise.resolve = function (value) {}

	// 返回一个指定resaon的失败的promise
	Promise.reject = function (reason) {}

	// 返回一个promise，只有当数组中所有的promise全部成功时才成功，否则失败
	Promise.all = function (promises) {}

	// 返回一个promise，由第一个完成的promise的状态决定最终状态
	Promise.race = function (promises) {}

	// 向外暴露promise
	window.Promise = Promise
})
