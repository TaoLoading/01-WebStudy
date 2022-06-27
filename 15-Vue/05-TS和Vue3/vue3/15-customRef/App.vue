<template>
  <h2>customRef的使用</h2>
  <input type="text" v-model="keyword" />
  <p>{{ keyword }}</p>
</template>

<script lang="ts">
import { customRef, defineComponent } from 'vue'
// 自定义hook防抖函数
function useDebouncedRef<T>(value: T, delay = 200) {
  // 存储定时器id的变量
  let timeOutId: number
  // customRef创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制
  return customRef((track, trigger) => {
    return {
      // 返回数据
      get() {
        // 告诉Vue追踪数据
        track()
        return value
      },
      // 设置数据
      set(newValue: T) {
        // 清理定时器
        clearTimeout(timeOutId)
        // 开启定时器
        timeOutId = setTimeout(() => {
          value = newValue
          // 告诉Vue更新界面
          trigger()
        }, delay)
      }
    }
  })
}
export default defineComponent({
  name: '',
  setup() {
    const keyword = useDebouncedRef('abc', 100)
    return {
      keyword
    }
  }
})
</script>

<style scoped>
</style>
