import { createApp } from 'vue'
// 引入createPinia
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
// 注册pinia
const store = createPinia()
app.use(store)

app.mount('#app')
