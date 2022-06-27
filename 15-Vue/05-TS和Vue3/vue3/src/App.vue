<template>
  <div>
    <h2>{{ obj2.name }}</h2>
    <h2>{{ obj2.age }}</h2>
    <button @click="change2">更改</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, toRefs, reactive } from 'vue'

export default defineComponent({
  /**
   * toRef将非响应式对象的某个属性改为响应式的，但不会更改页面；若原始对象为代理过的响应式对象，则会更改页面
   * 
   * toRefs协助我们结构响应式数据，通过toRefs结构出来的数据也是响应式的
   * 
   * toRaw将响应式对象转化为非响应式的普通对象
   */
  setup() {
    // 测试toRef
    const obj = {
      name: 'xm',
      age: 23
    }
    const newObj = toRef(obj, 'age')
    const change = () => {
      newObj.value++
      console.log('原始对象', obj)
      console.log('toRef后的对象', newObj)
    }

    // 测试toRefs
    const obj2 = reactive({
      name: 'xh',
      age: 24
    })
    let { age } = toRefs(obj2)
    const change2 = () => {
      age.value++
      obj2.name += '111'
    }
    return {
      obj,
      newObj,
      change,
      obj2,
      change2
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
