## pinia学习记录

## 注册pinia
1. vue3 中使用 pinia
```
import { createApp } from 'vue'
// 引入createPinia
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
// 注册pinia
app.use(createPinia())

app.mount('#app')

```
2. vue2 中使用 pinia
```
import Vue from 'vue'
// 引入createPinia
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  pinia
})
```

### 使用pinia
1. 页面中引入暴露出的容器并调用
2. 解构时使用 storeToRefs 以确保响应式正常
```
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMainStore } from '../store/index'

const store = useMainStore()

// 使用 storeToRefs 结构容器中的数据，以确保响应式正常
const { msg, count } = storeToRefs(store)
</script>

<template>
  <p>{{ msg }}</p>
  <p>{{ count }}</p>
</template>

<style scoped>
</style>
```

### 数据修改
1. 单条数据修改直接使用 store.属性名 的形式
2. 多条数据修改使用 $patch
   * 传入参数为对象
     ```
     store.$patch({
      msg: 'hello',
      count: store.count + 1
     })
     ```
   * 传入参数为函数
     ```
     store.$patch(state => {
      state.msg = 'hello'
      state.count++
     })
     ```
3. 逻辑比较多时封装到 action 中进行修改，在页面内调用
   ```
   changeData() {
     this.msg = 'world',
     this.count++
   }
   ```

### Getters
getter 和 Vue 中的计算属性几乎一样，在获取 State 值之前做一些逻辑处理，并且具有缓存特性，值不变的情况下多次使用只调用一次
```
getters: {
 count10(state) {
   return state.count + 10
 }
}
```
PS: 如果在 getters 中使用了 this且未使用 state ，则必须手动指定返回值类型，否则类型推导失败

### store之间的相互调用
可以在一个 store 中 import 另外一个 store ，然后通过调用引入 store 方法的形式，获取引入 store 的状态