## pinia学习记录

## 注册pinia
1. vue3中使用pinia
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
2. vue2中使用pinia
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