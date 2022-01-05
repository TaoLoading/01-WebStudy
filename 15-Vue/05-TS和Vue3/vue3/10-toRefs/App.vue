<template>
  <h2>toRefs的使用</h2>
  <hr>
  <h2>name:{{name}}</h2>
  <h2>age:{{age}}</h2>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "",
  setup() {
    const state = reactive({
      name: "lht",
      age: 21,
    });
    // toRefs把一个响应式对象转换成普通对象，该普通对象的每个property都是一个ref
    // 当从合成函数返回响应式对象时，toRefs 非常有用，这样对象中的数据就可以在不丢失响应式状态下分解使用
    const state2 = toRefs(state);
    setInterval(() => {
      state.name += "======";
      console.log("========");
    }, 1000);
    return {
      ...state2,
    };
  },
});
</script>

<style scoped>
</style>
