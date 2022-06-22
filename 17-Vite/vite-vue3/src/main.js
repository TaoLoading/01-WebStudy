import { createApp } from 'vue'
// App.jsx文件
import App from './App'
// App.vue文件
// import App from './App.vue'

console.log('import.meta.env', import.meta.env)
console.log('import.meta.env.VITE_TITLE', import.meta.env.VITE_TITLE)

createApp(App).mount('#app')
