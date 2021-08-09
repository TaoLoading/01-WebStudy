// 小方块大小
var sw = 20, // 宽
	sh = 20, // 高
	tr = 30, // 行数
	td = 30 // 列数

// 创建需要用到的全局变量
var snake = null,
	food = null,
	game = null

// 用于构造函数生成蛇头、蛇身、食物的构造函数
function Square(x, y, classname) {
	// 计算坐标（注意与下文系数坐标区分）
	this.x = x * sw
	this.y = y * sh

	this.class = classname
	// 方块对应的DOM元素
	this.viewContent = document.createElement('div')
	this.viewContent.className = this.class
	// 方块的父级
	this.parent = document.getElementById('snakeWrap')
}
// 设置方块属性并添加到页面
Square.prototype.create = function () {
	this.viewContent.style.position = 'absolute'
	this.viewContent.style.width = sw + 'px'
	this.viewContent.style.height = sh + 'px'
	this.viewContent.style.top = this.y + 'px'
	this.viewContent.style.left = this.x + 'px'

	this.parent.appendChild(this.viewContent)
}
// 删除方块
Square.prototype.remove = function () {
	this.parent.removeChild(this.viewContent)
}

// 用于储存蛇信息的构造函数
function Snake() {
	this.head = null
	this.tail = null
	// 蛇身上方块的位置
	this.pos = []
	// 蛇走的方向
	this.directionNum = {
		left: {
			x: -1,
			y: 0,
		},
		right: {
			x: 1,
			y: 0,
		},
		up: {
			x: 0,
			y: -1,
		},
		down: {
			x: 0,
			y: 1,
		},
	}
}
// 初始化蛇
Snake.prototype.init = function () {
	// 创建蛇头
	var snakeHead = new Square(2, 0, 'snakeHead')
	snakeHead.create()
	this.head = snakeHead
	this.pos.push([2, 0])
	// 创建蛇身1
	var snakeBody1 = new Square(1, 0, 'snakeBody')
	snakeBody1.create()
	this.pos.push([1, 0])
	// 创建蛇身2（此时也是蛇尾）
	var snakeBody2 = new Square(0, 0, 'snakeBody')
	snakeBody2.create()
	this.tail = snakeBody2
	this.pos.push([0, 0])

	// 建立链表关系（通过last和next形成链表）
	snakeHead.last = null
	snakeHead.next = snakeBody1
	snakeBody1.last = snakeHead
	snakeBody1.next = snakeBody2
	snakeBody2.last = snakeBody1
	snakeBody2.next = null

	// 默认蛇向右走
	this.direction = this.directionNum.right
}

// 获取蛇头下一步对应的坐标，并根据坐标进行判断位置
Snake.prototype.getNextPos = function () {
	// 蛇头下一个点的坐标，此时使用的是系数坐标
	var nextPos = [
		this.head.x / sw + this.direction.x,
		this.head.y / sh + this.direction.y,
	]

	// 下个点是自己
	var selfCollide = false
	this.pos.forEach(function (value) {
		if (value[0] == nextPos[0] && value[1] == nextPos[1]) {
			selfCollide = true
		}
	})
	if (selfCollide) {
		console.log('撞到了自己')
		this.strategies.die.call(this)

		return // 使用return结束判断
	}

	// 下一个点是围墙
	if (
		nextPos[0] < 0 ||
		nextPos[1] < 0 ||
		nextPos[0] > td - 1 ||
		nextPos[1] > tr - 1
	) {
		console.log('撞到了围墙')
		this.strategies.die.call(this)

		return
	}

	// 下一个点是食物
	if (food && food.pos[0] == nextPos[0] && food.pos[1] == nextPos[1]) {
		console.log('撞到食物了')
		this.strategies.eat.call(this)

		return
	}

	// 下一个点没有东西
	// 调用“move()”并修改this的指向到实例对象，修改前this指向this.strategies
	this.strategies.move.call(this)
}

// 根据判断的位置处理下一步要走的任务
Snake.prototype.strategies = {
	move: function (format) {
		// foramt参数用于决定是否删除最后一个方块，传入则不删除，不传入则删除

		// 定义新身体补充到旧蛇头的位置
		var newBody = new Square(
			this.head.x / sw,
			this.head.y / sh,
			'snakeBody'
		)
		// 更新链表关系
		newBody.next = this.head.next // this.head.next即snakeBody1，但由于不属于一个函数不能能直接调用，故借助链表
		newBody.next.last = newBody
		newBody.last = null

		// 移除旧蛇头并创建新身体
		this.head.remove()
		newBody.create()

		// 定义新蛇头，即下一个点的位置
		var newHead = new Square(
			this.head.x / sw + this.direction.x,
			this.head.y / sh + this.direction.y,
			'snakeHead'
		)
		// 更新链表关系
		newHead.next = newBody
		newBody.last = newHead
		newHead.last = null

		// 创建新蛇头
		newHead.create()

		// 更新pos
		// 更新前pos：[旧头，身体1，身体2]
		// 更新后pos：[新头，新身体，身体1，身体2]
		// 旧头 == 新身体，所以更新pos只需要在最前面插入心头
		this.pos.splice(0, 0, [
			this.head.x / sw + this.direction.x,
			this.head.y / sh + this.direction.y,
		])

		// 更新head
		this.head = newHead

		// 判断是否删除。不传值则为undefined，!undefined==1，则删除
		if (!format) {
			this.tail.remove()
			this.tail = this.tail.last

			// 更新pos
			this.pos.pop()
		}
	},
	eat: function () {
		this.strategies.move.call(this, true)
		creatFood()
		game.score++
	},
	die: function () {
		game.over()
	},
}

// 创建蛇
var snake = new Snake()

// 创建食物
function creatFood() {
	// 食物坐标
	var x = null,
		y = null,
		// 循环跳出条件
		include = true

	// 遍历数组看食物坐标是否在蛇身上
	while (include) {
		x = Math.round(Math.random() * (td - 1))
		y = Math.round(Math.random() * (tr - 1))

		snake.pos.forEach(function (value) {
			if (x !== value[0] && y != value[1]) {
				include = false
			}
		})
	}

	// 生成食物
	food = new Square(x, y, 'food')
	// 储存食物的坐标。用于跟蛇头下一步要走的点做对比
	food.pos = [x, y]
	// 判断食物是否存在并进行产生或者移除
	var foodDom = document.querySelector('.food')
	if (foodDom) {
		foodDom.style.left = x * sw + 'px'
		foodDom.style.top = y * sh + 'px'
	} else {
		food.create()
	}
}

// 创建游戏逻辑
function Game() {
	this.timer = null
	this.score = 0
}
Game.prototype.init = function () {
	snake.init()
	// snake.getNextPos()
	creatFood()

	window.onkeydown = function (event) {
		if (
			event.keyCode == 37 &&
			snake.direction != snake.directionNum.right
		) {
			console.log('左')
			snake.direction = snake.directionNum.left
		} else if (
			event.keyCode == 38 &&
			snake.direction != snake.directionNum.down
		) {
			console.log('上')
			snake.direction = snake.directionNum.up
		} else if (
			event.keyCode == 39 &&
			snake.direction != snake.directionNum.left
		) {
			console.log('右')
			snake.direction = snake.directionNum.right
		} else if (
			event.keyCode == 40 &&
			snake.direction != snake.directionNum.up
		) {
			console.log('下')
			snake.direction = snake.directionNum.down
		}
	}

	this.start()
}

// 开始游戏规则
Game.prototype.start = function () {
	this.timer = setInterval(function () {
		snake.getNextPos()
	}, 200)
}
Game.prototype.pause = function () {
	clearInterval(this.timer)
}
// 游戏结束规则
Game.prototype.over = function () {
	clearInterval(this.timer)
	alert('你的得分为' + this.score)

	// 游戏回到初始状态
	var snakeWrap = document.getElementById('snakeWrap')
	snakeWrap.innerHTML = '' // 清空HTML内容
	sanke = new Snake() // 清空创建实例对象
	game = new Game()
	var startBtnWrap = document.querySelector('.startBtn')
	startBtnWrap.style.display = 'block'
}

// 开始游戏
var game = new Game()
var startBtn = document.querySelector('.startBtn button')
startBtn.onclick = function () {
	startBtn.parentNode.style.display = 'none'
	game.init()
}

// 暂停游戏
var snakeWrap = document.getElementById('snakeWrap')
var pauseBtn = document.querySelector('.pauseBtn button')
snakeWrap.onclick = function () {
	game.pause()
	pauseBtn.parentNode.style.display = 'block'
}
// 继续游戏
pauseBtn.onclick = function () {
	game.start()
	pauseBtn.parentNode.style.display = 'none'
}
