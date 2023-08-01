import { createApp } from 'vue'
// 引入 createPinia
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
// 注册 pinia
app.use(createPinia())

app.mount('#app')
