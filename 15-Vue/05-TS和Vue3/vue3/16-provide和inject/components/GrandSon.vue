<template>
  <h3 :style="{ color }">孙子组件: {{ color }}</h3>
</template>

<script lang="ts">
import { inject } from 'vue'
export default {
  setup() {
    // 接收注入
    const color = inject('color')
    return {
      color
    }
  }
}
</script>