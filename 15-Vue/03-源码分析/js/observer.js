function Observer(data) {
	// 保存data
	this.data = data
	// 开始对data实现劫持
	this.walk(data)
}

Observer.prototype = {
	walk: function (data) {
		var me = this
		// 遍历data中所有属性
		Object.keys(data).forEach(function (key) {
			// 给data重新定义响应式属性(setter)
			me.defineReactive(data, key, data[key])
		})
	},

	defineReactive: function (data, key, val) {
		// 1. 创建一个对应的dep对象
		var dep = new Dep()
		// 2. 通过递归调用实现所有层次的属性劫持
		var childObj = observe(val)
		// 3. 给data重新定义属性 ==> 加setter/getter
		Object.defineProperty(data, key, {
			enumerable: true, // 可枚举
			configurable: false, // 不能再define
			// 3-1. 用于建立dep和watcher的关系
			get: function () {
				if (Dep.target) {
					dep.depend()
				}
				return val
			},
			// 3-2. 用于监视data数据变化
			set: function (newVal) {
				if (newVal === val) {
					return
				}
				val = newVal
				// 新的值是object的话，进行监视
				childObj = observe(newVal)
				// 通过dep通知所有相关订阅者watcher
				dep.notify()
			},
		})
	},
}

function observe(value, vm) {
	if (!value || typeof value !== 'object') {
		return
	}

	// 创建Observer的实例
	return new Observer(value)
}

var uid = 0

function Dep() {
	this.id = uid++
	this.subs = []
}

Dep.prototype = {
	addSub: function (sub) {
		this.subs.push(sub)
	},

	depend: function () {
		Dep.target.addDep(this)
	},

	removeSub: function (sub) {
		var index = this.subs.indexOf(sub)
		if (index != -1) {
			this.subs.splice(index, 1)
		}
	},

	notify: function () {
		// 遍历每个相关的订阅者watcher
		this.subs.forEach(function (sub) {
			// 让watcher去更新对应的节点
			sub.update()
		})
	},
}

Dep.target = null
