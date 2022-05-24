<template>
  <h2>reactive</h2>
  <h2>姓名：{{ user.name }}</h2>
  <h2>姓名：{{ user.age }}</h2>
  <br />
  <button @click="updateUser()">更新名字</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    const obj = {
      name: 'lht',
      age: 22
    }
    // reactive定义多个数据的响应式
    // 返回一个Proxy的代理对象，其中target属性指向的对象即此处的user为被代理的对象，被代理的目标对象就是obj
    // 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
    const user = reactive(obj)
    const updateUser = () => {
      // 只能通过代理对象来修改属性值
      // 修改目标对象可以同步修改代理对象，但不能实现数据的渲染
      user.name = 'xcy'
      user.age++
    }
    return {
      user,
      updateUser
    }
  }
})
</script>
