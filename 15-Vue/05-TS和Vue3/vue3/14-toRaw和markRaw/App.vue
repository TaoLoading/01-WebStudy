<template>
  <h2>toRaw和markRow</h2>
  <h3>state:{{ state }}</h3>
  <hr />
  <button @click="testToRaw">测试toRaw</button>
  <button @click="testMarkRaw">测试markRaw</button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, markRaw } from 'vue'
interface UserInfo {
  name: string
  age: number
  likes?: string[]
}
export default defineComponent({
  name: '',
  setup() {
    const state = reactive<UserInfo>({
      name: 'lht',
      age: 21
    })
    const testToRaw = () => {
      // 把代理对象转换为普通对象，即数据变化界面不变化
      const user = toRaw(state)
      user.name += '==='
    }
    const testMarkRaw = () => {
      const likes = ['xyc1', 'xcy2']
      state.likes = markRaw(likes)
      setInterval(() => {
        if (state.likes) {
          // 数据没有变化
          // markRaw标记一个对象，使其永远不会转换为代理对象
          state.likes[0] += '='
          console.log('定时器已启动')
        }
      }, 1000)
    }
    return {
      state,
      testToRaw,
      testMarkRaw
    }
  }
})
</script>

<style scoped>
</style>
