<template>
  <!-- 
        组件模板中找数据去组件对象中找
  -->
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"></Header>
      <!-- 在标签中写:xxx="xxx"是向该传递xxx以及它的值 -->
      <!-- List不需要deleteTodo，Item需要，故先传给List再传给Item，逐层传递 -->
      <List :todos="todos"
            :deleteTodo="deleteTodo"
            :updateTodo="updateTodo"></List>
      <Footer :todos="todos"
              :checkAllTodos="checkAllTodos"
              :clearCompleteTodos="clearCompleteTodos"></Footer>
    </div>
  </div>
</template>

<script>
// 引入组件
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
// 引入工具模块
import { saveTodos, getTodos } from './utils/storageUtils.js'

export default {
  data () {
    return {
      /* 
            结合界面及功能描述设计数据：
            1.类型：[{ id: 1, title: 'A', complete: false }]
            2.名称：todos
            3.放在哪个组件？看哪个组件使用。本示例每个组件都需要用到todos，故放在整体的App中
            */
      todos: [],
    }
  },

  methods: {
    // 定义的所有的方法都会成为组件对象的方法
    // 定义需要操作数据的函数时，数据在哪里，就在哪里定义。本示例数据在App，故定义在App中，只是通过App再传递给其他组件

    // 增加todo
    addTodo (todo) {
      this.todos.unshift(todo)
    },
    // 删除todo
    deleteTodo (index) {
      this.todos.splice(index, 1)
    },
    // 全选/全不选todos
    checkAllTodos (isCheck) {
      this.todos.forEach((todo) => (todo.complete = isCheck))
    },
    // 清除已完成的todo
    clearCompleteTodos () {
      // 使用filter过滤出服务条件的新数组
      // 因为filter不会改变原数组，故将产生的新数组重新传递给原数组
      this.todos = this.todos.filter((todo) => !todo.complete)
    },
    // 更新勾选状态
    updateTodo (todo, isCheck) {
      todo.complete = isCheck
    },
  },

  // 局部注册组件
  components: {
    Header,
    List,
    Footer,
  },

  // 监视数据
  watch: {
    todos: {
      // 深度监视
      deep: true,
      // 以JSON的形式保存最新的todos到local
      /* handler(value) {
        // value是最新的todos

        // localStorage.setItem('todos_key', JSON.stringify(value))
        saveTodos(value)
            }, */
      // 简化代码
      // 与上述代码功能相同，注意不要将此'saveTodos'看做单纯的变量，它是一个有形参的函数
      handler: saveTodos,
    },
  },

  mounted () {
    // 加载数据
    // this.todos = JSON.parse(localStorage.getItem('todos_key')) || []
    this.todos = getTodos()
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
