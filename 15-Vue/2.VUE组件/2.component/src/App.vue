<template>
	<!-- 
        组件模板中找数据去组件对象中找
     -->
	<div class="todo-container">
		<div class="todo-wrap">
			<Header :addTodo="addTodo"></Header>
			<!-- 在标签中写:xxx="xxx"是向该传递xxx以及它的值 -->
			<!-- List不需要deleteTodo，Item需要，故先传给List再传给Item，逐层传递 -->
			<List :todos="todos" :deleteTodo="deleteTodo"></List>
			<Footer></Footer>
		</div>
	</div>
</template>

<script>
// 引入组件
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'

export default {
	data() {
		return {
			/* 
            结合界面及功能描述设计数据：
            1.类型：[{ id: 1, title: 'A', complete: false }]
            2.名称：todos
            3.放在哪个组件？看哪个组件使用。本示例每个组件都需要用到todos，故放在整体的App中
            */
			todos: [
				{ id: 1, title: 'A', complete: false },
				{ id: 2, title: 'B', complete: true },
				{ id: 3, title: 'C', complete: false },
			],
		}
	},

	methods: {
		// 定义的所有的方法都会成为组件对象的方法

		// 更新数据的函数
		// 定义更新数据的函数时，数据在哪里，就在哪里定义。本示例数据在App，故定义在App中
		addTodo(todo) {
			this.todos.unshift(todo)
		},
		deleteTodo(index) {
			this.todos.splice(index, 1)
		},
	},

	// 局部注册组件
	components: {
		Header,
		List,
		Footer,
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
