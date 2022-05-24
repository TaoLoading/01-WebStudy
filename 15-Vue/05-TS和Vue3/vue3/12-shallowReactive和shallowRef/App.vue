<template>
  <h2>shallowReactive和shallowRef</h2>
  <h3>m1:{{ m1 }}</h3>
  <h3>m2:{{ m2 }}</h3>
  <h3>m3:{{ m3 }}</h3>
  <h3>m4:{{ m4 }}</h3>
  <hr />
  <button @click="updateData">更新数据</button>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  shallowReactive,
  shallowRef
} from 'vue'
export default defineComponent({
  /**
   * 一般情况下使用ref和reactive即可
   * 如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
   * 如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef
   */
  name: '',
  setup() {
    // 深度劫持(监视) --- 深度响应式
    const m1 = reactive({
      name: 'lht',
      age: 21,
      wife: {
        name: 'xcy',
        age: 22
      }
    })
    // 浅劫持(监视) --- 浅响应式 --- 只处理对象内最外层属性的响应式
    const m2 = shallowReactive({
      name: 'lht',
      age: 21,
      wife: {
        name: 'xcy',
        age: 22
      }
    })
    // 深度劫持(监视) --- 深度响应式 --- 做了reactive处理
    const m3 = ref({
      name: 'lht',
      age: 21,
      wife: {
        name: 'xcy',
        age: 22
      }
    })
    // 浅劫持(监视) --- 浅响应式 --- 只处理value的响应式, 不进行对象的reactive处理
    const m4 = shallowRef({
      name: 'lht',
      age: 21,
      wife: {
        name: 'xcy',
        age: 22
      }
    })
    const updateData = () => {
      // 更新m1数据
      // m1.name += "==";
      // m1.wife.name += "==";
      // 更新m2数据
      // m2.name += "==";
      // m2.wife.name += "==";
      // 更新m3数据
      // m3.value.name += "==";
      // m3.value.wife.name += "==";
      // 更新m4数据
      m4.value.name += '=='
      // m4.value.wife.name += "==";
    }
    return {
      m1,
      m2,
      m3,
      m4,
      updateData
    }
  }
})
</script>

<style scoped>
</style>
