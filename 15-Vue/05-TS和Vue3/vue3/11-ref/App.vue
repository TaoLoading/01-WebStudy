<template>
  <h2>ref另一个作用：获取页面中的元素</h2>
  <hr />
  <input type="text" ref="inputRef" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  name: '',
  setup() {
    // 默认是空的，页面加载完毕时组件已经存在，可以获取文本框元素
    const inputRef = ref<HTMLElement | null>(null)
    onMounted(() => {
      inputRef.value && inputRef.value.focus()
    })
    return {
      inputRef
    }
  }
})
</script>

<style scoped>
</style>
