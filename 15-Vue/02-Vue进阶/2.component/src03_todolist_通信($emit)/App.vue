<template>
	<!-- 
        之前实现子组件与父组件中的通信使用的是props，
        此示例中使用的是自定义事件实现子组件与父组件的通信。

        自定义事件实现通信的步骤：
        1.绑定事件监听。绑定事件监听有两种方式，需要注意的是不论那种方式，都是在父组件代码中给子组件绑定事件监听
        2.分发事件。分发事件是放在了子组件代码中
        注意绑定事件监听和分发事件是同一个组件对象

        本示例最后还实现自定义事件的解绑
     -->
	<div class="todo-container">
		<div class="todo-wrap">
			<!-- 通过props实现数据子向父通信 -->
			<!-- <Header :addTodo="addTodo"></Header> -->

			<!-- 通过自定义事件实现子向父通信 -->
			<!-- 子向父通信绑定监听方式一： -->
			<Header @addTodo="addTodo"></Header>
			<List :todos="todos" :updateTodo="updateTodo"></List>
			<Footer
				:todos="todos"
				:checkAllTodos="checkAllTodos"
				:clearCompleteTodos="clearCompleteTodos"
			></Footer>
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
		// 通过$globalEventBus绑定自定义事件监听
		this.$globalEventBus.$on('deleteTodo', this.deleteTodo)

		// 子向父通信绑定监听方式二
		// 注意是给<Header>组件对象绑定自定义事件监听，而此时this代表的是App父组件对象，故要使用ref使引用指向子组件
		// this.$refs.header.$on('addTodo', this.addTodo)

		this.todos = getTodos()
	},

	beforeDestroy() {
		// 解绑自定义事件监听
		this.$refs.header.$off('addTodo')
		this.$globalEventBus.$off('deleteTodo')
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
