<template>
  <img alt="Vue logo"
       src="./assets/logo.png">
  <!-- 使用子级组件 -->
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script lang="ts">
// defineComponent函数，目的是定义一个组件
import { defineComponent } from "vue";
// 引入子级组件
import HelloWorld from "./components/HelloWorld.vue";
// 向外暴露定义好的组件，内部传入配置对象
export default defineComponent({
  // 组件名
  name: "App",
  // 注册组件
  components: {
    // 注册子组件
    HelloWorld,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
