// 自定义插件
;(function (window) {
	// 定义插件对象
	const MyPlugin = {}

	MyPlugin.install = function (Vue, options) {
		// 1.给Vue添加工具/静态方法
		Vue.myGlobalMethod = function () {
			console.log('Vue.myGlobalMethod')
		}

		// 2.定义全局指令
		Vue.directive('my-directive', (el, binding) => {
			el.textContent = binding.value + '---taoloading'
		})

		// 3. 添加实例方法
		Vue.prototype.$myMethod = function (methodOptions) {
			console.log('vm.$myMethod()')
		}
	}

	// 暴露插件
	window.MyPlugin = MyPlugin
})(window)
