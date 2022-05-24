<template>
  <div>msg</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  /**
   * readonly:
   * 深度只读数据
   * 获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
   * 只读代理是深层的：访问的任何嵌套 property 也是只读的。
   *
   * shallowReadonly
   * 浅只读数据
   * 创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换
   */
  name: ''
})
</script>

<style scoped>
</style>
