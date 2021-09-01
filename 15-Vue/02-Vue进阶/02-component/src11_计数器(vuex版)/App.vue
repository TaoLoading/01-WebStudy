<template>
  <div>
    <p>
      clicked {{ $store.state.count }} times, count is
      {{ $store.getters.evenOrOdd }}
    </p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>
<script>
export default {
  methods: {
    increment() {
      // 触发mutations调用，直接更新状态数据
      this.$store.commit('INCREMENT')
    },
    decrement() {
      // 触发mutations调用，直接更新状态数据
      this.$store.commit('DECREMENT')
    },
    incrementIfOdd() {
      // 触发actions调用，简介更新状态数据
      this.$store.dispatch('incrementIfOdd')
    },
    incrementAsync() {
      // 触发actions调用，简介更新状态数据
      this.$store.dispatch('incrementAsync')
    },
  },
}
</script>
<style scoped></style>
