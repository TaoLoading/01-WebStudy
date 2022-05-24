<template>
  <div>{{ msg }}</div>
  <button @click="msg += '==='">更新数据</button>
  <hr />
  <child :msg="msg" @xxx="xxx"></child>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Child from './components/Child.vue'
export default defineComponent({
  components: { Child },
  name: 'App',
  setup() {
    const msg = ref('this is a msg')
    function xxx() {
      console.log(msg.value)
    }
    // 返回一个对象
    return {
      msg,
      xxx
    }
  }
})
</script>
