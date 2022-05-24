<template>
  <h2>子级组件</h2>
  <h3>{{ msg }}</h3>
  <button @click="update">更新数据</button>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

export default defineComponent({
  name: 'Child',
  // vue2.x生命周期
  beforeCreate() {
    console.log('2.x中的beforeCreate()')
  },
  created() {
    console.log('2.x中的created()')
  },
  beforeMount() {
    console.log('2.x中的beforeMount()')
  },
  mounted() {
    console.log('2.x中的mounted()')
  },
  beforeUpdate() {
    console.log('2.x中的beforeUpdate()')
  },
  updated() {
    console.log('2.x中的updated()')
  },
  // vue3中beforeDestroy和destroyed已更名
  beforeUnmount() {
    console.log('2.x中的beforeDestroy()')
  },
  unmounted() {
    console.log('2.x中的destroyed()')
  },

  setup() {
    // vue3生命周期
    console.log('3.0中的setup()，继承了beforeCreate()和created()')
    const msg = ref('abc')
    const update = () => {
      msg.value += '==='
    }
    onBeforeMount(() => {
      console.log('3.0中的onBeforeMount')
    })
    onMounted(() => {
      console.log('3.0中的onMounted')
    })
    onBeforeUpdate(() => {
      console.log('3.0中的onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('3.0中的onUpdated')
    })
    onBeforeUnmount(() => {
      console.log('3.0中的onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('3.0中的onUnmounted')
    })
    return {
      msg,
      update
    }
  }
})
</script>

<style scoped>
</style>
