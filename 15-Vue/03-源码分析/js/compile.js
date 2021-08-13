function Compile(el, vm) {
	// 保存vm
	this.$vm = vm
	// 保存el元素
	this.$el = this.isElementNode(el) ? el : document.querySelector(el)
	if (this.$el) {
		// 1. 将el中所有子节点转移到fragment对象中
		this.$fragment = this.node2Fragment(this.$el)
		// 2. 编译fragment对象中所有层次的子节点(通过递归)
		this.init()
		// 3. 将编译好的fragment对象添加到el元素中
		this.$el.appendChild(this.$fragment)
	}
}

Compile.prototype = {
	node2Fragment: function (el) {
		var fragment = document.createDocumentFragment(),
			child

		// 将原生节点拷贝到fragment
		while ((child = el.firstChild)) {
			fragment.appendChild(child)
		}

		return fragment
	},

	init: function () {
		// 编译fragment对象中所有的子节点
		this.compileElement(this.$fragment)
	},

	compileElement: function (el) {
		// 1. 得到最外层的所有子节点
		var childNodes = el.childNodes,
			me = this
		// 2. 遍历所有子节点
		;[].slice.call(childNodes).forEach(function (node) {
			// 3. 得到文本节点的内容
			var text = node.textContent
			// 用于匹配插值的正则对象
			var reg = /\{\{(.*)\}\}/

			// 4-1. 如果是元素节点
			if (me.isElementNode(node)) {
				// 编译元素节点中的指令属性
				me.compile(node)
				// 4-2. 如果是插值格式的文本节点
			} else if (me.isTextNode(node) && reg.test(text)) {
				// 编译包含插值的文本节点
				me.compileText(node, RegExp.$1)
			}

			if (node.childNodes && node.childNodes.length) {
				me.compileElement(node)
			}
		})
	},

	compile: function (node) {
		// 1. 得到所有的属性节点
		var nodeAttrs = node.attributes,
			me = this
		// 2. 遍历所有属性
		Array.prototype.slice.call(nodeAttrs).forEach(function (attr) {
			// 3. 得到属性名(v-on:click)
			var attrName = attr.name
			// 4. 判断是否是指令属性
			if (me.isDirective(attrName)) {
				// 5. 得到属性值(show)
				var exp = attr.value
				// 6. 得到指令名(click)
				var dir = attrName.substring(2)
				// 7. 判断是否是事件指令
				if (me.isEventDirective(dir)) {
					// 7-1. 处理事件指令
					compileUtil.eventHandler(node, me.$vm, exp, dir)
					// 7-2. 处理普通指令
				} else {
					compileUtil[dir] && compileUtil[dir](node, me.$vm, exp)
				}

				// 8. 移除指令属性
				node.removeAttribute(attrName)
			}
		})
	},

	compileText: function (node, exp) {
		// 工具对象编译文本节点
		compileUtil.text(node, this.$vm, exp)
	},

	isDirective: function (attr) {
		return attr.indexOf('v-') == 0
	},

	isEventDirective: function (dir) {
		return dir.indexOf('on') === 0
	},

	isElementNode: function (node) {
		return node.nodeType == 1
	},

	isTextNode: function (node) {
		return node.nodeType == 3
	},
}

// 包含多个用于编译指令/对象的工具方法的对象
var compileUtil = {
	// 编译插值/v-text
	text: function (node, vm, exp) {
		this.bind(node, vm, exp, 'text')
	},

	// 编译v-html
	html: function (node, vm, exp) {
		this.bind(node, vm, exp, 'html')
	},

	// 编译v-model
	model: function (node, vm, exp) {
		// 1. 实现初始化显示
		// 2. 创建watcher对象用于更新显示
		this.bind(node, vm, exp, 'model')

		var me = this,
			// 得到表达式对应的值
			val = this._getVMVal(vm, exp)
		// 给input绑定事件监听
		node.addEventListener('input', function (e) {
			// 得到最新输入的值
			var newValue = e.target.value
			if (val === newValue) {
				return
			}

			// 将最新输入的值保存到表达式对应的data中的属性上，紧接着引起数据绑定代码运行
			me._setVMVal(vm, exp, newValue)
			val = newValue
		})
	},

	// 编译v-class，功能类似v-bind:class
	class: function (node, vm, exp) {
		this.bind(node, vm, exp, 'class')
	},

	// 真正进行编译的方法(exp是表达式，dir是指令)
	bind: function (node, vm, exp, dir) {
		// 1. 根据指令名得到对应更新节点的函数
		var updaterFn = updater[dir + 'Updater']

		// 2. 执行更新函数第一次更新节点 ==> 初始化显示
		updaterFn && updaterFn(node, this._getVMVal(vm, exp))

		// 为当前节点创建一个对应的watcher，并指定用于更新节点的回调函数
		new Watcher(vm, exp, function (value, oldValue) {
			// 更新对应的节点
			updaterFn && updaterFn(node, value, oldValue)
		})
	},

	// 事件处理
	eventHandler: function (node, vm, exp, dir) {
		// 得到事件名/类型
		var eventType = dir.split(':')[1],
			// 根据表达式去methods中取得对应的事件处理函数
			fn = vm.$options.methods && vm.$options.methods[exp]

		if (eventType && fn) {
			// 给元素节点绑定指定事件名和回调函数的DOM事件监听，并指定this是vm
			/* 
            为什么指定this是vm？
            因为绑定的回调函数不是methods中定义的函数，而是通过bind()返回的新函数。先调用新函数，新函数中this指向调用该函数的节点，
            内部再自动调用原来的函数，原函数中this为vm。通过指定this的指向为vm，确保调用函数时this不变
            */
			node.addEventListener(eventType, fn.bind(vm), false)
		}
	},

	_getVMVal: function (vm, exp) {
		var val = vm._data
		exp = exp.split('.')
		exp.forEach(function (k) {
			val = val[k]
		})
		return val
	},

	_setVMVal: function (vm, exp, value) {
		var val = vm._data
		exp = exp.split('.')
		exp.forEach(function (k, i) {
			// 非最后一个key，更新val的值
			if (i < exp.length - 1) {
				val = val[k]
			} else {
				val[k] = value
			}
		})
	},
}

// 包含n个用于更新节点方法的对象
var updater = {
	// 更新节点的textContent
	textUpdater: function (node, value) {
		node.textContent = typeof value == 'undefined' ? '' : value
	},

	// 更新节点的innerHTML
	htmlUpdater: function (node, value) {
		node.innerHTML = typeof value == 'undefined' ? '' : value
	},

	// 更新节点的className
	classUpdater: function (node, value, oldValue) {
		var className = node.className
		className = className.replace(oldValue, '').replace(/\s$/, '')

		var space = className && String(value) ? ' ' : ''

		node.className = className + space + value
	},

	// 更新节点的value
	modelUpdater: function (node, value, oldValue) {
		node.value = typeof value == 'undefined' ? '' : value
	},
}
