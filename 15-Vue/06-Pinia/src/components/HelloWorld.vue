<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMainStore } from '../store/index'

const store = useMainStore()

// 使用 storeToRefs 结构容器中的数据，以确保响应式正常
const { msg, count } = storeToRefs(store)

// 修改数据
const modifyState = () => {
  // 单条数据修改
  // store.count++

  // 多条数据修改
  // 传入对象
  /* store.$patch({
    msg: 'hello',
    count: store.count + 1
  }) */

  // 传入函数
  /* store.$patch(state => {
    state.msg = 'hello'
    state.count++
  }) */

  // 使用 action 修改
  store.changeData()
}
</script>

<template>
  <div>
    <p>{{ msg }}</p>
    <p>{{ count }}</p>
    <button @click="modifyState">修改数据</button>
  </div>
</template>

<style scoped>
</style>
