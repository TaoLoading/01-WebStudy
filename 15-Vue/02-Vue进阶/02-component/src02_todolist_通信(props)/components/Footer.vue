<template lang="">
	<div class="todo-footer">
		<label>
			<input type="checkbox" v-model="isCheckAll" />
		</label>
		<span>
			<span>已完成{{ completeSize }}</span> / 全部{{ todos.length }}
		</span>
		<button
			class="btn btn-danger"
			v-show="completeSize > 0"
			@click="confirmClearCompleteTodos"
		>
			清除已完成任务
		</button>
	</div>
</template>

<script>
export default {
	/*
    模板数据的来源：
    1.data：自身可变数据
    2.props：从外部接收的可变数据
    3.computed：根据已有的data或props数据进行计算产生的数据
    */
	props: {
		todos: Array,
		checkAllTodos: Function,
		clearCompleteTodos: Function,
	},
	computed: {
		completeSize() {
			// reduce()：根据数组中的元素进行统计处理
			return this.todos.reduce(
				(pre, todo) => pre + (todo.complete ? 1 : 0),
				0
			)
		},
		isCheckAll: {
			get() {
				return (
					this.todos.length == this.completeSize &&
					this.completeSize > 0
				)
			},
			set(value) {
				// 操作checkbox时调用
				// 对todos进行全选/全不选
				// value代表当前勾选的状态
				this.checkAllTodos(value)
			},
		},
	},
	methods: {
		confirmClearCompleteTodos() {
			if (confirm('你确定删除已完成任务吗？')) {
				this.clearCompleteTodos()
			}
		},
	},
}
</script>

<style scoped>
.todo-footer {
	height: 40px;
	line-height: 40px;
	padding-left: 6px;
	margin-top: 5px;
}

.todo-footer label {
	display: inline-block;
	margin-right: 20px;
	cursor: pointer;
}

.todo-footer label input {
	position: relative;
	top: -1px;
	vertical-align: middle;
	margin-right: 5px;
}

.todo-footer button {
	float: right;
	margin-top: 5px;
}
</style>
