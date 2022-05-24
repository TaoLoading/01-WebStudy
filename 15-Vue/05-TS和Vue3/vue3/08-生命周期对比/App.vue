<template>
  <h2>父级组件</h2>
  <button @click="changeShow">切换显示</button>
  <hr />
  <child v-if="isShow"></child>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Child from './components/Child.vue'
export default defineComponent({
  name: 'App',
  components: {
    Child
  },
  setup() {
    const isShow = ref(true)
    const changeShow = () => {
      isShow.value = !isShow.value
    }
    return {
      isShow,
      changeShow
    }
  }
})
</script>

<style scoped>
</style>
