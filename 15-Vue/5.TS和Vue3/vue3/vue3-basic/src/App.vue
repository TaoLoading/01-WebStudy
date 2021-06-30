<template>
  <h2>{{count}}</h2>
  <button @click="updateCount()">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  // 新的option, 所有的组合API函数都在此使用, 只在初始化时执行一次
  setup() {
    // let count = 0; // 此时数据并不是响应式数据
    // ref定义一个数据的响应式。创建一个包含响应式数据的引用对象，通过xxx.value形式修改数据
    const count = ref(0);
    function updateCount() {
      count.value++;
    }
    // 返回一个对象
    return {
      count,
      updateCount,
    };
  },
});
</script>
