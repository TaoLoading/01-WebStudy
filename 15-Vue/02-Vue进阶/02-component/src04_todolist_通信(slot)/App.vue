<template>
	<div class="todo-container">
		<div class="todo-wrap">
			<!-- 通过props实现数据子向父通信 -->
			<!-- <Header :addTodo="addTodo"></Header> -->

			<!-- 通过自定义事件实现子向父通信 -->
			<!-- 子向父通信绑定监听方式一： -->
			<Header @addTodo="addTodo"></Header>
			<List :todos="todos" :updateTodo="updateTodo"></List>
			<Footer>
				<!-- 传递插槽内容 -->
				<!-- 插槽内容是在父组件中解析好后再传递给子组件 -->

				<input type="checkbox" v-model="isCheckAll" />
				<span slot="middle">
					<span>已完成{{ completeSize }}</span> / 全部{{
						todos.length
					}}
				</span>
				<button
					slot="right"
					class="btn btn-danger"
					v-show="completeSize > 0"
					@click="confirmClearCompleteTodos"
				>
					清除已完成任务
				</button>
			</Footer>
		</div>
	</div>
</template>

<script>
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import { saveTodos, getTodos } from './utils/storageUtils.js'

export default {
	data() {
		return {
			todos: [],
		}
	},

	methods: {
		addTodo(todo) {
			this.todos.unshift(todo)
		},
		deleteTodo(index) {
			this.todos.splice(index, 1)
		},
		checkAllTodos(isCheck) {
			this.todos.forEach((todo) => (todo.complete = isCheck))
		},
		clearCompleteTodos() {
			this.todos = this.todos.filter((todo) => !todo.complete)
		},
		updateTodo(todo, isCheck) {
			todo.complete = isCheck
		},
		confirmClearCompleteTodos() {
			if (confirm('你确定删除已完成任务吗？')) {
				this.clearCompleteTodos()
			}
		},
	},

	components: {
		Header,
		List,
		Footer,
	},

	watch: {
		todos: {
			deep: true,
			handler: saveTodos,
		},
	},

	mounted() {
		this.$globalEventBus.$on('deleteTodo', this.deleteTodo)
		this.todos = getTodos()
	},

	beforeDestroy() {
		this.$refs.header.$off('addTodo')
		this.$globalEventBus.$off('deleteTodo')
	},
	// 由于需要故将原子组件中定义的内容搬到父组件中
	computed: {
		completeSize() {
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
				this.checkAllTodos(value)
			},
		},
	},
}
</script>

<style scoped>
.todo-container {
	width: 600px;
	margin: 0 auto;
}
.todo-container .todo-wrap {
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}
</style>
