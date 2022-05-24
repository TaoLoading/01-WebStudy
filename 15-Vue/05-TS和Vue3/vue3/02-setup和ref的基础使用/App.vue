<template>
  <div>{{ count }}</div>
  <button @click="updateCount">点击增加</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'App',
  // 新的option, 所有的组合API函数都在此使用, 只在初始化时执行一次
  setup() {
    // let count = 0; // 不能进行修改，因为此时数据并不是响应式数据
    // ref定义一个基本类型的响应式数据。返回一个包含响应式数据的ref对象，通过xxx.value形式修改数据
    // 在html模板中不需要使用.value获取数据
    const count = ref(0)
    function updateCount() {
      count.value++
    }
    // 返回一个对象
    return {
      count,
      updateCount
    }
  }
})
</script>
