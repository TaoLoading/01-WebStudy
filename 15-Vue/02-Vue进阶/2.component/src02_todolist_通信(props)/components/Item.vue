<template>
	<li
		:style="{ backgroundColor: bgColor }"
		@mouseenter="handleEnter(true)"
		@mouseleave="handleEnter(false)"
	>
		<label>
			<input type="checkbox" v-model="isCheck" />
			<span>{{ todo.title }}</span>
		</label>
		<button class="btn btn-danger" v-show="isShow" @click="confirmDelete">
			删除
		</button>
	</li>
</template>
<script>
export default {
	// 声明接收属性:指定属性名/属性值的类型
	props: {
		todo: Object,
		deleteTodo: Function,
		index: Number,
		updateTodo: Function,
	},
	data() {
		return {
			bgColor: 'white',
			isShow: false,
		}
	},
	methods: {
		handleEnter(isEnter) {
			if (isEnter) {
				// 进入
				;(this.bgColor = '#aaaaaa'), (this.isShow = true)
			} else {
				// 移出
				;(this.bgColor = '#ffffff'), (this.isShow = false)
			}
		},
		confirmDelete(index) {
			if (confirm('你确定删除吗？')) {
				this.deleteTodo(this.index)
			}
		},
	},
	computed: {
		// 计算选框的状态
		isCheck: {
			get() {
				return this.todo.complete
			},
			set(value) {
				this.updateTodo(this.todo, value)
			},
		},
	},
}
</script>
<style scoped>
li {
	list-style: none;
	height: 36px;
	line-height: 36px;
	padding: 0 5px;
	border-bottom: 1px solid #ddd;
}

li label {
	float: left;
	cursor: pointer;
}

li label li input {
	vertical-align: middle;
	margin-right: 6px;
	position: relative;
	top: -1px;
}

li button {
	float: right;
	margin-top: 3px;
}

li:before {
	content: initial;
}

li:last-child {
	border-bottom: none;
}
</style>

<!-- 
    注意：vue中不建议在子组件中更改父组件中的数据
    因为父组件的子组件可能有多个，在其中一个子组件修改了父组件的数据后会影响其他子组件
 -->
