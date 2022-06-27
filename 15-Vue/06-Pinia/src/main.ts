import { createApp } from 'vue'
// 引入createPinia
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
// 注册pinia
app.use(createPinia())

app.mount('#app')
